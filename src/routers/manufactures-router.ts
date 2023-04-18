import { Router } from "express";
import {
  findAllManufactures,
  findTopRatedManufactures,
} from "../controllers/manufactures-controller";

const manufactureRouter = Router();

manufactureRouter
  .get("/top", findTopRatedManufactures)
  .get("/", findAllManufactures)
  .get("/:id", findAllManufactures);

export { manufactureRouter };
