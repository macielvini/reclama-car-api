import { Router } from "express";
import { findAllManufactures } from "../controllers/manufactures-controller";

const manufactureRouter = Router();

manufactureRouter
  .get("/:id", findAllManufactures)
  .get("/", findAllManufactures);

export { manufactureRouter };
