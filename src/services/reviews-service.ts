import { notFoundError } from "../errors/not-found-error";
import {
  CreateReviewParams,
  reviewsRepository,
} from "../repositories/reviews-repository";
import { carsService } from "./cars-service";
import { userService } from "./users-service";

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

async function findAllByUserId(userId: string) {
  await userService.validateUserId(userId);
  return await reviewsRepository.findAllByUserId(userId);
}

export const reviewsService = {
  create,
  findAll,
  findTrending,
  findAllByUserId,
};
