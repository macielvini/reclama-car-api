import { Request, Response } from "express";
import httpStatus from "http-status";
import { errorHandler } from "../middlewares/error-handler";
import { UserParams } from "../repositories/users-repository";
import { userService } from "../services/users-service";

export async function createUser(req: Request, res: Response) {
  const body = req.body as UserParams;

  try {
    await userService.create(body);
    res.sendStatus(httpStatus.CREATED);
  } catch (error: any) {
    errorHandler(req, res, error);
  }
}
