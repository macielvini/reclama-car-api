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

async function findById(id: string) {
  return await prisma.user.findUnique({
    where: { id: id },
  });
}

export const userRepository = { create, findByEmail, findById };
