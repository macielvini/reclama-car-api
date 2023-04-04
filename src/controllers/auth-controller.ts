import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { authService, SignInParams } from "../services/auth-service";

export async function signIn(req: Request, res: Response) {
  const body = req.body as SignInParams;
  try {
    const data = await authService.signIn(body);

    res.send(data);
  } catch (error: any) {
    errorHandler(req, res, error);
  }
}
