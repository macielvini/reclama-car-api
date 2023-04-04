import { Router } from "express";
import { createUser } from "../controllers/users-controller";
import { validateBody } from "../middlewares/schema-validation-middleware";
import { userSchema } from "../schemas/users-schema";

const userRouter = Router();

userRouter.post("/create", validateBody(userSchema), createUser);

export { userRouter };
