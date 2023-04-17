import httpStatus from "http-status";
import { ApplicationError } from "../protocols";

export function ratingExistsError(): ApplicationError {
  return {
    status: httpStatus.FORBIDDEN,
    message: "Car already rated",
    type: "ratingAlreadyExistsError",
  };
}
