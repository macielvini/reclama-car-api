import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError, ZodSchema } from "zod";

type ZodResult = {
  success: boolean;
  error: ZodError;
};

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body) as ZodResult;

    if (!result.success) {
      const error = result.error;
      const message = error.issues.map(
        (issue) => `${issue.path[0]}: ${issue.message}`
      );

      return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(message);
    }

    next();
  };
}
