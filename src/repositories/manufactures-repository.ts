import { prisma } from "../config/database";

async function findAll() {
  return prisma.manufacture.findMany({});
}

async function findById(id: string) {
  return prisma.manufacture.findUnique({
    where: { id: id },
  });
}

type ManufactureAvgRating = {
  id: string;
  name: string;
  image: string;
  rating: {
    general: number;
    maintenance: number;
    drivability: number;
    comfort: number;
    consumption: number;
  };
};

async function findTopReviewed(take?: number): Promise<ManufactureAvgRating[]> {
  return prisma.$queryRaw`
    SELECT 
      manufactures.id,
      manufactures.name,
      manufactures.image,
      JSON_BUILD_OBJECT(
        'general', AVG("Rating".general),
        'maintenance', AVG("Rating".maintenance),
        'drivability', AVG("Rating".drivability),
        'comfort', AVG("Rating".comfort),
        'consumption', AVG("Rating".consumption)
        ) as rating
    FROM manufactures
    JOIN cars 
    ON manufactures.id = cars.manufacture_id
    JOIN "Rating"
    ON cars.id = "Rating".car_id
    GROUP BY manufactures.id
    LIMIT ${take}`;
}

export const manufacturesRepository = { findAll, findById, findTopReviewed };
