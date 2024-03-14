import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { migrate } from "drizzle-orm/postgres-js/migrator";

import "dotenv/config";
import * as schema from "@/database/schema";

const connectionString = process.env.DRIZZLE_DATABASE_URL!;
if (!connectionString) {
  console.log("No database connection string was provided.");
}

// for migrations
const migrationClient = postgres(connectionString, { max: 1 });
const migrationDb = drizzle(migrationClient, { schema });

const main = async () => {
  try {
    console.log("🟢 Migration initiated...");
    await migrate(migrationDb, { migrationsFolder: "drizzle" });
    console.log("✅ Migration finished...");
  } catch (error) {
    console.log("❌ Error:", error);
  } finally {
    await migrationClient.end();
    console.log("🔴 Connection terminated...")
  }
};

main();
