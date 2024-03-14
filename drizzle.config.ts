import type { Config } from "drizzle-kit";
import 'dotenv/config'


export default {
  schema: "./database/schema.ts",
  out: "./drizzle",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DATABASE_URL!,
  }
} satisfies Config;