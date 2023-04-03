import httpStatus from "http-status";
import { ApplicationError } from "../protocols";

export function duplicatedEmailError(): ApplicationError {
  return {
    status: httpStatus.CONFLICT,
    message: "E-mail already in use",
  };
}
