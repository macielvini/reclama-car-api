import { notFoundError } from "../errors/not-found-error";
import { tagsRepository } from "../repositories/tags-repository";

async function findAll() {
  return await tagsRepository.findAll();
}

async function findById(id: string) {
  return await tagsRepository.findById(id);
}

async function findManyByIdList(idList: string[]) {
  const data = await tagsRepository.findManyByIdList(idList);
  if (!data) throw notFoundError("tags");
  return data;
}

export const tagsService = { findAll, findById, findManyByIdList };
