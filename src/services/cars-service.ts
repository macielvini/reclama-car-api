import { carsRepository } from "../repositories/cars-repository";

async function findAll() {
  return await carsRepository.findAll();
}

async function findById(id: string) {
  return await carsRepository.findById(id);
}

async function findByManufactureId(id: string) {
  return await carsRepository.findByManufactureId(id);
}

async function findByYear(year: number) {
  return await carsRepository.findByYear(year);
}

export const carsService = {
  findAll,
  findById,
  findByManufactureId,
  findByYear,
};
