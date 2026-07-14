import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { neon } from "@neondatabase/serverless";
import { and, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";

import { assets } from "../src/server/db/schema";
import { getDatabaseConnection } from "../src/server/db/url";
import { uploadToR2 } from "../src/server/storage/r2";

const cvPath = resolve("jose cv actualizado.docx");
const cvKey = "assets/cv/cv.docx";
const cvName = "jose-cv-actualizado";

const body = await readFile(cvPath);
const url = await uploadToR2({
  key: cvKey,
  body,
  contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
});

const databaseConnection = getDatabaseConnection();

if (databaseConnection) {
  const scriptDb = databaseConnection.driver === "neon"
    ? drizzle(neon(databaseConnection.url))
    : drizzlePg(new pg.Pool({ connectionString: databaseConnection.url }));

  await scriptDb
    .delete(assets)
    .where(and(eq(assets.type, "cv"), eq(assets.name, cvName)));

  await scriptDb.insert(assets).values({
    name: cvName,
    type: "cv",
    url,
    description: "CV actualizado de Jose Brusa",
  });
}

console.log(`CV uploaded: ${url}`);
