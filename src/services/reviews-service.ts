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

export const reviewsService = { create };
