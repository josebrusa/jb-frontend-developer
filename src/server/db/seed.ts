import { config } from "dotenv";
import { count } from "drizzle-orm";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";

import { seedExperiences } from "./fallback-experiences";
import { seedProjects } from "./fallback-projects";
import { experiences, projects } from "./schema";
import { getDatabaseConnection } from "./url";

config({ path: ".env.local" });
config();

const databaseConnection = getDatabaseConnection();

if (!databaseConnection) {
  throw new Error(
    "Database connection env vars are required to seed the database. Set DATABASE_URL or DB_USER, DB_HOST, DB_PORT, and DB_NAME in .env.local.",
  );
}

const pool = new pg.Pool({ connectionString: databaseConnection.url });
const seedDb = drizzlePg(pool);
const seedOnlyEmptyTables = process.argv.includes("--if-empty");

async function tableHasRows(table: typeof experiences | typeof projects): Promise<boolean> {
  const [result] = await seedDb.select({ value: count() }).from(table);
  return (result?.value ?? 0) > 0;
}

if (!seedOnlyEmptyTables || !(await tableHasRows(experiences))) {
  for (const experience of seedExperiences) {
    await seedDb
      .insert(experiences)
      .values(experience)
      .onConflictDoUpdate({
        target: experiences.slug,
        set: {
          year: experience.year,
          title: experience.title,
          company: experience.company,
          duration: experience.duration,
          details: experience.details,
          skills: experience.skills,
          sortOrder: experience.sortOrder,
        },
      });
  }
}

if (!seedOnlyEmptyTables || !(await tableHasRows(projects))) {
  for (const project of seedProjects) {
    await seedDb
      .insert(projects)
      .values(project)
      .onConflictDoUpdate({
        target: projects.slug,
        set: {
          title: project.title,
          description: project.description,
          repositoryUrl: project.repositoryUrl,
          demoUrl: project.demoUrl,
          imageUrl: project.imageUrl,
          technologies: project.technologies,
          featured: project.featured,
          sortOrder: project.sortOrder,
        },
      });
  }
}

await pool.end();
