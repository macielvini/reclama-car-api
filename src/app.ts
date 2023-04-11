import express, { Request, Response } from "express";
import { loadEnvs } from "./config/envs";
import cors from "cors";
import { userRouter } from "./routers/users-router";
import { authRouter } from "./routers/auth-router";
import { manufactureRouter } from "./routers/manufactures-router";
import { carsRouter } from "./routers/cars-router";

loadEnvs();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req: Request, res: Response) => res.send("OK!"))
  .use("/users", userRouter)
  .use("/auth", authRouter)
  .use("/manufactures", manufactureRouter)
  .use("/cars", carsRouter);

export default app;
