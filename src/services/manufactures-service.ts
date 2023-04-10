import { manufacturesRepository } from "../repositories/manufactures-repository";

async function findAll() {
  return await manufacturesRepository.findAll();
}

async function findById(id: string) {
  return await manufacturesRepository.findById(id);
}

export const manufacturesService = { findAll, findById };
