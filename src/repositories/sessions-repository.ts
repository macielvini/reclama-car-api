import { prisma } from "../config/database";

export type SessionParams = {
  userId: string;
  token: string;
};

async function create(data: SessionParams) {
  return await prisma.session.create({ data });
}

async function findToken(token: string) {
  return await prisma.session.findFirst({ where: { token } });
}

export const sessionRepository = { create, findToken };
