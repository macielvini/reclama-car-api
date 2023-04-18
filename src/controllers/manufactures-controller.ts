import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { manufacturesService } from "../services/manufactures-service";

export async function findAllManufactures(req: Request, res: Response) {
  const id: string = req.params.id;

  try {
    let data;

    if (id) {
      data = await manufacturesService.findById(id);
    } else {
      data = await manufacturesService.findAll();
    }

    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}

export async function findTopRatedManufactures(req: Request, res: Response) {
  const take = parseInt(req.query.take as string);

  try {
    const data = await manufacturesService.findTopReviewed(take);
    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}
