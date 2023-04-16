import { Router } from "express";
import {
  createReview,
  findAllReviews,
  findReviewByUserIdAndCarId,
  findTrendingReviews,
} from "../controllers/reviews-controller";
import { validateBody } from "../middlewares/schema-validation-middleware";
import { reviewSchema } from "../schemas/reviews-schema";
import { authenticateToken } from "../middlewares/auth-middleware";
import { authenticateAdmin } from "../middlewares/admin-middleware";
import { findAllTags } from "../controllers/tags-controller";

const reviewsRouter = Router();

reviewsRouter
  .post("/", validateBody(reviewSchema), authenticateToken, createReview)
  .get("/", authenticateAdmin, findAllReviews)
  .get("/trending", findTrendingReviews)
  .get("/user/:userId", findAllReviews)
  .get("/car/:carId/", authenticateToken, findReviewByUserIdAndCarId)
  .get("/tags", findAllTags);

export { reviewsRouter };
