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

async function findByManufactureIdAndYear(id: string, year: number) {
  return await prisma.car.findMany({
    where: {
      year: year,
      manufactureId: id,
    },
    select: {
      id: true,
      model: true,
      engineSize: true,
      fuelType: true,
      image: true,
      year: true,
    },
  });
}

async function findYearsByManufactureId(id: string) {
  return await prisma.car.findMany({
    where: { manufactureId: id },
    select: { id: true, year: true },
  });
}

type CarAvgRatings = {
  id: string;
  model: string;
  image: string;
  engineSize: string;
  year: number;
  fuelType: string;
  rating: {
    general: number;
    maintenance: number;
    drivability: number;
    comfort: number;
    consumption: number;
  };
};

async function findTopReviewed(take?: number): Promise<CarAvgRatings[]> {
  return prisma.$queryRaw`SELECT 
      cars.id,
      cars.model,
      cars.image,
      cars."engineSize",
      cars.year,
      cars."fuelType",
      JSON_BUILD_OBJECT(
        'general', AVG("Rating".general),
        'maintenance', AVG("Rating".maintenance),
        'drivability', AVG("Rating".drivability),
        'comfort', AVG("Rating".comfort),
        'consumption', AVG("Rating".consumption)
        ) as rating
    FROM cars 
    JOIN "Rating"
    ON cars.id = "Rating".car_id
    GROUP BY cars.id
    LIMIT ${take}`;
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
  findYearsByManufactureId,
  findByManufactureIdAndYear,
  findTopReviewed,
  create,
};
