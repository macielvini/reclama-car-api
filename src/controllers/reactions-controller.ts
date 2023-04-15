import httpStatus from "http-status";
import { errorHandler } from "../middlewares/error-handler";
import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import { Response } from "express";
import { reactionsService } from "../services/reactions-service";

export async function toggleReaction(req: AuthenticatedRequest, res: Response) {
  const userId = req.userId;
  const reviewId = req.params.reviewId;
  try {
    const data = await reactionsService.toggle(userId, reviewId);
    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}
