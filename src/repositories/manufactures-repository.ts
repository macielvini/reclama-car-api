import { prisma } from "../config/database";

async function findAll() {
  return prisma.manufacture.findMany({});
}

async function findById(id: string) {
  return prisma.manufacture.findUnique({
    where: { id: id },
  });
}

export const manufacturesRepository = { findAll, findById };
