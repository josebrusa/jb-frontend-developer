export function getDatabaseConnection(): { url: string; driver: "pg" } | null {
  const databaseUrl = process.env.DATABASE_URL;

  if (databaseUrl && !isPlaceholderDatabaseUrl(databaseUrl)) {
    return { url: normalizePostgresSslMode(databaseUrl), driver: "pg" };
  }

  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD ?? "";
  const name = process.env.DB_NAME;

  if (!user || !name) {
    return null;
  }

  const host = process.env.DB_HOST || "localhost";
  const port = process.env.DB_PORT || "5432";

  if (host === "host") {
    return null;
  }

  return {
    url: buildPostgresUrl({ user, password, host, port, name }),
    driver: "pg",
  };
}

function normalizePostgresSslMode(value: string): string {
  try {
    const url = new URL(value);
    const sslMode = url.searchParams.get("sslmode");

    if (sslMode && ["prefer", "require", "verify-ca"].includes(sslMode)) {
      url.searchParams.set("sslmode", "verify-full");
    }

    return url.toString();
  } catch {
    return value;
  }
}

export function getDatabaseUrl(): string | null {
  return getDatabaseConnection()?.url ?? null;
}

function isPlaceholderDatabaseUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return ["host", "hostname", "localhost.example"].includes(url.hostname);
  } catch {
    return true;
  }
}

function buildPostgresUrl(input: {
  user: string;
  password: string;
  host: string;
  port: string;
  name: string;
}): string {
  const auth = input.password
    ? `${encodeURIComponent(input.user)}:${encodeURIComponent(input.password)}`
    : encodeURIComponent(input.user);

  return `postgresql://${auth}@${input.host}:${input.port}/${input.name}`;
}
