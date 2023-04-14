import { Router } from "express";
import { toggleReaction } from "../controllers/reactions-controller";
import { authenticateToken } from "../middlewares/auth-middleware";

const reactionsRouter = Router();

reactionsRouter.patch("/review/:reviewId", authenticateToken, toggleReaction);

export { reactionsRouter };
