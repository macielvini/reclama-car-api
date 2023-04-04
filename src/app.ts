import express, { Request, Response } from "express";
import { loadEnvs } from "./config/envs";
import cors from "cors";
import { userRouter } from "./routers/users-router";

loadEnvs();

const app = express();

app
  .use(cors())
  .use(express.json())
  .get("/health", (_req: Request, res: Response) => res.send("OK!"))
  .use("/users/", userRouter);

export default app;
