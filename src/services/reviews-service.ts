import { error } from "console";
import { notFoundError } from "../errors/not-found-error";
import {
  CreateReviewParams,
  reviewsRepository,
} from "../repositories/reviews-repository";
import { carsService } from "./cars-service";
import { userService } from "./users-service";
import { ratingExistsError } from "../errors/rating-error";
import { reviewWithoutTagsError } from "../errors/tags-error";
import { tagsService } from "./tags-service";

async function create(userId: string, data: CreateReviewParams) {
  const car = carsService.findById(data.carId);
  if (!car) throw notFoundError("car");

  const lastReview = await reviewsRepository.findByUserIdAndCarId(
    userId,
    data.carId
  );

  console.log(lastReview);

  if (lastReview && !lastReview.Rating && data.rating) {
    throw ratingExistsError();
  }

  if (lastReview && data.tags.length < 1) throw reviewWithoutTagsError();

  await tagsService.findManyByIdList(data.tags);

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

async function findByUserIdAndCarId(userId: string, carId: string) {
  await userService.validateUserId(userId);
  await carsService.validateCarId(carId);

  const data = await reviewsRepository.findByUserIdAndCarId(userId, carId);

  if (!data) throw notFoundError("review");

  return data;
}

async function validateById(id: string) {
  const data = await reviewsRepository.findById(id);
  if (!data) throw notFoundError("review");
  return data;
}

export const reviewsService = {
  create,
  findAll,
  findTrending,
  findAllByUserId,
  findByUserIdAndCarId,
  validateById,
};
