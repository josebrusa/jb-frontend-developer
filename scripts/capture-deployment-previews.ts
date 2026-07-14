import nextEnv from "@next/env";
import { asc, eq } from "drizzle-orm";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";
import { chromium } from "playwright";

nextEnv.loadEnvConfig(process.cwd());

const [{ projects }, { getDatabaseConnection }, { uploadToR2 }] = await Promise.all([
  import("../src/server/db/schema"),
  import("../src/server/db/url"),
  import("../src/server/storage/r2"),
]);

const force = process.argv.includes("--force");
const databaseConnection = getDatabaseConnection();

if (!databaseConnection) {
  throw new Error("DATABASE_URL is required to capture deployment previews");
}

const pool = new pg.Pool({ connectionString: databaseConnection.url });
const scriptDb = drizzlePg(pool);

const rows = await scriptDb
  .select({
    id: projects.id,
    title: projects.title,
    slug: projects.slug,
    demoUrl: projects.demoUrl,
    imageUrl: projects.imageUrl,
  })
  .from(projects)
  .orderBy(asc(projects.sortOrder), asc(projects.title));

const liveProjects = rows.filter((project) => project.demoUrl && (force || !project.imageUrl));

if (liveProjects.length === 0) {
  console.log(force ? "No live projects found." : "All live projects already have preview images.");
  await pool?.end();
  process.exit(0);
}

let browser;

try {
  browser = await chromium.launch();
} catch (error) {
  console.error("Could not launch Playwright Chromium. Run `pnpm exec playwright install chromium` and try again.");
  throw error;
}

try {
  for (const project of liveProjects) {
    if (!project.demoUrl) {
      continue;
    }

    console.log(`Capturing ${project.title}: ${project.demoUrl}`);

    const page = await browser.newPage({ viewport: { width: 1440, height: 960 }, deviceScaleFactor: 1 });

    try {
      await page.goto(project.demoUrl, { waitUntil: "domcontentloaded", timeout: 30_000 });
      await page.waitForLoadState("networkidle", { timeout: 8_000 }).catch(() => null);
      await page.waitForTimeout(1_500);

      const body = await page.screenshot({ type: "jpeg", quality: 82, fullPage: false });
      const imageUrl = await uploadToR2({
        key: `assets/img/deployment/${project.slug}.jpg`,
        body,
        contentType: "image/jpeg",
      });

      await scriptDb.update(projects).set({ imageUrl }).where(eq(projects.id, project.id));
      console.log(`Uploaded ${imageUrl}`);
    } catch (error) {
      console.error(`Skipped ${project.title}: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
  await pool?.end();
}
