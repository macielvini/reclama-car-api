import { prisma } from "../config/database";
import { Car } from "@prisma/client";

async function findAll() {
  return prisma.car.findMany({
    include: { manufacture: true },
  });
}

async function findById(id: string) {
  return prisma.car.findUnique({
    where: { id: id },
    include: { manufacture: true },
  });
}

async function findByManufactureId(id: string) {
  return prisma.car.findMany({
    where: { manufactureId: id },
    include: { manufacture: true },
  });
}

async function findByYear(year: number) {
  return prisma.car.findMany({
    where: { year: year },
    include: { manufacture: true },
  });
}

export type CreateCarsParams = Omit<Car, "id" | "createdAt" | "updatedAt">;
async function create(data: CreateCarsParams) {
  return prisma.car.create({
    data,
  });
}

export const carsRepository = {
  findAll,
  findById,
  findByManufactureId,
  findByYear,
  create,
};
