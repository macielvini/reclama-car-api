import { prisma } from "../config/database";
import { User } from "@prisma/client";

export type UserParams = Omit<User, "id" | "createdAt" | "updatedAt" | "role">;

async function create(data: UserParams) {
  return await prisma.user.create({
    data,
  });
}

async function findByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email: email } });
}

export const userRepository = { create, findByEmail };
