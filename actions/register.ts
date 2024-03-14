"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";

import { db } from "@/database/db";
import { users } from "@/database/schema";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid Fields!" };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    console.log(existingUser);
    return { error: "Email already in use!" };
  }

  await db.insert(users).values({ name, email, password: hashedPassword });

  // TODO; Send verification token email

  return { success: "User created!" };
};
