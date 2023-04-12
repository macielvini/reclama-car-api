import { Request, NextFunction, Response } from "express";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import { sessionRepository } from "../repositories/sessions-repository";

export async function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.header("Authorization");
  if (!authHeader) return generateUnauthorizedResponse(res);

  const token = authHeader?.replace("Bearer ", "");
  if (!token) return generateUnauthorizedResponse(res);

  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;

    const session = sessionRepository.findToken(token);
    if (!session) return generateUnauthorizedResponse(res);

    req.userId = userId;
    return next();
  } catch (error) {
    return generateUnauthorizedResponse(res);
  }
}

function generateUnauthorizedResponse(res: Response) {
  res.sendStatus(httpStatus.UNAUTHORIZED);
}

export type AuthenticatedRequest = Request & JWTPayload;

type JWTPayload = {
  userId: string;
};
