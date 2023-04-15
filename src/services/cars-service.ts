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

async function findYearsByManufactureId(id: string) {
  return await carsRepository.findYearsByManufactureId(id);
}

async function findByManufactureIdAndYear(id: string, year: number) {
  return await carsRepository.findByManufactureIdAndYear(id, year);
}

async function validateCarId(id: string) {
  const data = await carsRepository.findById(id);
  if (!data) throw notFoundError("car");
  return data;
}

export const carsService = {
  findAll,
  findById,
  findByManufactureId,
  findByYear,
  findYearsByManufactureId,
  findByManufactureIdAndYear,
  validateCarId,
};
