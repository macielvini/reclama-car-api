import { Router } from "express";
import {
  findAllCars,
  findCarById,
  findCarsByManufactureId,
} from "../controllers/cars-controller";

const carsRouter = Router();

carsRouter
  .get("/", findAllCars)
  .get("/:id", findCarById)
  .get("/manufacture/:id", findCarsByManufactureId);

export { carsRouter };
