import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { reviewsService } from "../services/reviews-service";
import { CreateReviewParams } from "../repositories/reviews-repository";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "../middlewares/auth-middleware";

export async function createReview(req: AuthenticatedRequest, res: Response) {
  const body = req.body as CreateReviewParams;
  const userId = req.userId;
  try {
    await reviewsService.create(userId, body);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    errorHandler(req, res, error);
  }
}

export async function findAllReviews(req: Request, res: Response) {
  const userId = req.params.userId;
  try {
    let data;
    if (userId) {
      data = await reviewsService.findAllByUserId(userId);
    } else {
      data = await reviewsService.findAll();
    }

    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}

export async function findReviewByUserIdAndCarId(
  req: AuthenticatedRequest,
  res: Response
) {
  const userId = req.userId;
  const carId = req.params.carId;
  try {
    const data = await reviewsService.findByUserIdAndCarId(userId, carId);
    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}

export async function findTrendingReviews(req: Request, res: Response) {
  const take = parseInt(req.query.take as string) || 10;
  const skip = parseInt(req.query.skip as string) || 0;
  const userId = "";

  try {
    const data = await reviewsService.findTrending(take, skip, userId);
    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}
