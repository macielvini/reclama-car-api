import { notFoundError } from "../errors/not-found-error";
import { carsRepository } from "../repositories/cars-repository";

async function findAll() {
  return await carsRepository.findAll();
}

async function findById(id: string) {
  const car = await carsRepository.findById(id);
  if (!car) throw notFoundError("car");
  return car;
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
