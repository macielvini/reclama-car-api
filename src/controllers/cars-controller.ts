import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { carsService } from "../services/cars-service";

export async function findAllCars(req: Request, res: Response) {
  const year = req.query.year as string;
  try {
    let data;

    if (year) {
      data = await carsService.findByYear(parseInt(year));
    } else {
      data = await carsService.findAll();
    }

    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}

export async function findCarById(req: Request, res: Response) {
  const id: string = req.params.id;

  try {
    const data = await carsService.findById(id);
    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}

export async function findCarsByManufactureId(req: Request, res: Response) {
  const id: string = req.params.id;
  const year = parseInt(req.query.year as string);

  try {
    let data;
    if (year) {
      data = await carsService.findByManufactureIdAndYear(id, year);
    } else {
      data = await carsService.findByManufactureId(id);
    }

    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}

export async function findCarsYearsByManufactureId(
  req: Request,
  res: Response
) {
  const id: string = req.params.id;

  try {
    const data = await carsService.findYearsByManufactureId(id);
    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}
