import { notFoundError } from "../errors/not-found-error";
import {
  CreateReviewParams,
  reviewsRepository,
} from "../repositories/reviews-repository";
import { carsService } from "./cars-service";

async function create(userId: string, data: CreateReviewParams) {
  const car = carsService.findById(data.carId);
  if (!car) throw notFoundError("car");

  return await reviewsRepository.create(userId, data);
}

async function findAll() {
  return await reviewsRepository.findAll();
}

async function findTrending(take: number, skip: number, userId?: string) {
  return await reviewsRepository.findTrending(take, skip, userId);
}

export const reviewsService = { create, findAll, findTrending };
