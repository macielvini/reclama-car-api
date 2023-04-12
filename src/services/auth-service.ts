// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { credentialError } from "../errors/credential-error";
import { sessionRepository } from "../repositories/sessions-repository";
import { userRepository } from "../repositories/users-repository";
import { roleError } from "../errors/role-error";

export type SignInParams = {
  email: string;
  password: string;
};

async function signIn(data: SignInParams) {
  const user = await validateEmail(data.email);

  await validatePassword(data.password, user.password);

  const token = await createSession(user.id);

  return { userId: user.id, token };
}

async function createSession(userId: string) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!);

  await sessionRepository.create({ userId, token });
  return token;
}

async function validateEmail(email: string) {
  const user = await userRepository.findByEmail(email);

  if (!user) throw credentialError();

  return user;
}

async function validatePassword(password: string, userPassword: string) {
  const validaPassword = await bcrypt.compare(password, userPassword);

  if (!validaPassword) throw credentialError();
}

async function validateAdmin(userId: string) {
  const user = await userRepository.findById(userId);
  if (user.role !== "ADMIN") throw roleError();
}

export const authService = { signIn, validateAdmin };
