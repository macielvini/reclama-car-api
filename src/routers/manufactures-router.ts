import { Router } from "express";
import {
  findAllManufactures,
  findTopManufactures,
} from "../controllers/manufactures-controller";

const manufactureRouter = Router();

manufactureRouter
  .get("/top", findTopManufactures)
  .get("/", findAllManufactures)
  .get("/:id", findAllManufactures);

export { manufactureRouter };
