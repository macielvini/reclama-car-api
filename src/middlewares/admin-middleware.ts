import { Request, NextFunction, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import { sessionRepository } from "../repositories/sessions-repository";
import { authService } from "../services/auth-service";
import { errorHandler } from "./error-handler";

export async function authenticateAdmin(
  req: AdminRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader?.replace("Bearer ", "");
  if (!token) return generateUnauthorizedResponse(res);
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = await sessionRepository.findToken(token);
    if (!session) return generateUnauthorizedResponse(res);

    await authService.validateAdmin(userId);

    req.userId = userId;
    return next();
  } catch (error) {
    errorHandler(req, res, error);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.status(httpStatus.UNAUTHORIZED).send("token");
}

export type AdminRequest = Request & JWTPayload;

type JWTPayload = {
  userId: string;
};
