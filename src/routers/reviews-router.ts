import { Router } from "express";
import { createReview, findReviews } from "../controllers/reviews-controller";
import { validateBody } from "../middlewares/schema-validation-middleware";
import { reviewSchema } from "../schemas/reviews-schema";
import { authenticateToken } from "../middlewares/auth-middleware";
import { authenticateAdmin } from "../middlewares/admin-middleware";

const reviewsRouter = Router();

reviewsRouter
  .post("/", validateBody(reviewSchema), authenticateToken, createReview)
  .get("/", authenticateAdmin, findReviews);

export { reviewsRouter };
