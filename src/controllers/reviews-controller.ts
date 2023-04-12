import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { reviewsService } from "../services/reviews-service";
import { CreateReviewParams } from "../repositories/reviews-repository";
import httpStatus from "http-status";

export async function createReview(req: Request, res: Response) {
  const body = req.body as CreateReviewParams;
  const userId = "trial";
  try {
    await reviewsService.create(userId, body);
    res.sendStatus(httpStatus.CREATED);
  } catch (error) {
    errorHandler(req, res, error);
  }
}

export async function findReviews(req: Request, res: Response) {
  const userId = "trial";
  try {
    const data = await reviewsService.findAll();
    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}
