import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/database/schema";

const connectionString = process.env.DRIZZLE_DATABASE_URL!;
if (!connectionString) {
  console.log("No database connection string was provided.");
}

// for query purposes
const queryClient = neon(connectionString);
export const db = drizzle(queryClient, {schema});
