import { Request, Response } from "express";
import { errorHandler } from "../middlewares/error-handler";
import { tagsService } from "../services/tags-service";
import { Tag } from "@prisma/client";

export async function findAllTags(req: Request, res: Response) {
  const body = req.body as Pick<Tag, "color" | "id" | "name">[];
  console.log(body);
  try {
    let data;
    if (body.length > 0) {
      const tags = body.map((tag) => tag.id);
      data = await tagsService.findManyByIdList(tags);
    } else {
      data = await tagsService.findAll();
    }
    res.send(data);
  } catch (error) {
    errorHandler(req, res, error);
  }
}
