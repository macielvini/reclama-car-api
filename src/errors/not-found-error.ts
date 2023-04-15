import httpStatus from "http-status";
import { ApplicationError } from "../protocols";

export function notFoundError(item?: string): ApplicationError {
  return {
    status: httpStatus.NOT_FOUND,
    message: `${item} not found!`,
  };
}
