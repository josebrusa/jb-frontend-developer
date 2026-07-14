import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

import { getDatabaseUrl } from "./src/server/db/url";

config({ path: ".env.local" });
config();

const databaseUrl = getDatabaseUrl();

if (!databaseUrl) {
  throw new Error(
    "Missing database connection. Set DATABASE_URL or DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, and DB_NAME in .env.local.",
  );
}

export default defineConfig({
  schema: "./src/server/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
