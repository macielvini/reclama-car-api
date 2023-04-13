import { Router } from "express";
import {
  findAllCars,
  findCarById,
  findCarsByManufactureId,
  findCarsYearsByManufactureId,
} from "../controllers/cars-controller";

const carsRouter = Router();

carsRouter
  .get("/", findAllCars)
  .get("/:id", findCarById)
  .get("/manufacture/:id", findCarsByManufactureId)
  .get("/manufacture/:id/year", findCarsYearsByManufactureId);

export { carsRouter };
