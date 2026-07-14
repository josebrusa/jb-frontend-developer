import { spawn } from "node:child_process";

function run(command: string, args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: process.env,
      shell: process.platform === "win32",
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} exited with code ${code}`));
    });
  });
}

const shouldRunDbSetup = process.env.VERCEL === "1" || process.env.RUN_DB_SETUP === "true";

if (!shouldRunDbSetup) {
  console.log("Skipping DB setup outside Vercel. Set RUN_DB_SETUP=true to run it locally.");
  process.exit(0);
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required for automatic production migrations and seed.");
}

console.log("Running production database migrations...");
await run("pnpm", ["db:migrate"]);

console.log("Seeding empty production tables...");
await run("pnpm", ["db:seed", "--", "--if-empty"]);
