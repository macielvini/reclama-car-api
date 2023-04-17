import { prisma } from "../config/database";

async function findAll() {
  return prisma.tag.findMany();
}

async function findById(id: string) {
  return prisma.tag.findUnique({ where: { id: id } });
}

async function findManyByIdList(idList: string[]) {
  return prisma.tag.findMany({ where: { id: { in: idList } } });
}

export const tagsRepository = { findAll, findById, findManyByIdList };
