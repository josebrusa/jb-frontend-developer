import { drizzle as drizzlePg } from "drizzle-orm/node-postgres";
import pg from "pg";

import * as schema from "./schema";
import { getDatabaseConnection } from "./url";

const databaseConnection = getDatabaseConnection();

export const hasDatabaseUrl = Boolean(databaseConnection);

export const db = databaseConnection
  ? drizzlePg(new pg.Pool({ connectionString: databaseConnection.url }), { schema })
  : null;
