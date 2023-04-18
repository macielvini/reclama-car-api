import { manufacturesRepository } from "../repositories/manufactures-repository";

async function findAll() {
  return await manufacturesRepository.findAll();
}

async function findById(id: string) {
  return await manufacturesRepository.findById(id);
}

async function findTopReviewed(take?: number) {
  const data = await manufacturesRepository.findTopReviewed(take);
  return data.map(({ rating, ...rest }) => ({
    ...rest,
    averageRating:
      (rating.maintenance +
        rating.comfort +
        rating.consumption +
        rating.drivability +
        rating.general) /
      5,
  }));
}

export const manufacturesService = { findAll, findById, findTopReviewed };
