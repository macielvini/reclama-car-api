import httpStatus from "http-status";
import { ApplicationError } from "../protocols";

export function credentialError(): ApplicationError {
  return {
    status: httpStatus.UNAUTHORIZED,
    message: "Invalid e-mail or password",
  };
}
