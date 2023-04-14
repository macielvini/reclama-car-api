import bcrypt from "bcrypt";
import { duplicatedEmailError } from "../errors/duplicate-email-error";
import { userRepository, UserParams } from "../repositories/users-repository";
import { notFoundError } from "../errors/not-found-error";

async function create(data: UserParams) {
  await validateUniqueEmail(data.email);

  const hashedPassword = await bcrypt.hash(data.password, 10);

  return await userRepository.create({ ...data, password: hashedPassword });
}

async function validateUniqueEmail(email: string) {
  const emailExists = await userRepository.findByEmail(email);
  if (emailExists) throw duplicatedEmailError();
}

async function validateUserId(id: string) {
  const user = await userRepository.findById(id);
  if (!user) throw notFoundError("user");
  return user;
}

export const userService = { create, validateUserId };
