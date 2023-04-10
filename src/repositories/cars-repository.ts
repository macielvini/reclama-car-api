import { prisma } from "../config/database";
import { Car } from "@prisma/client";

async function findAll() {
  return prisma.car.findMany();
}

async function findById(id: string) {
  return prisma.car.findUnique({
    where: { id: id },
  });
}

async function findByManufactureId(id: string) {
  return prisma.car.findMany({
    where: { manufactureId: id },
  });
}

async function findByYear(year: number) {
  return prisma.car.findMany({ where: { year: year } });
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
