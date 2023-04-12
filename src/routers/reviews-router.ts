import { Router } from "express";
import { createReview, findReviews } from "../controllers/reviews-controller";
import { validateBody } from "../middlewares/schema-validation-middleware";
import { reviewSchema } from "../schemas/reviews-schema";

const reviewsRouter = Router();

reviewsRouter
  .post("/", validateBody(reviewSchema), createReview)
  .get("/", findReviews);

export { reviewsRouter };
