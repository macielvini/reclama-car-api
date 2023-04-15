import { Request, Response } from "express";
import httpStatus from "http-status";
// import { AuthenticatedRequest } from "../middlewares/auth-middleware";
import { ApplicationError } from "../protocols";

export function errorHandler(
  req: Request,
  res: Response,
  error: ApplicationError | any
) {
  if (error.status) return res.status(error.status).send(error);
  console.log(error);
  return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
