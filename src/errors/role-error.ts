import httpStatus from "http-status";
import { ApplicationError } from "../protocols";

export function roleError(): ApplicationError {
  return {
    status: httpStatus.UNAUTHORIZED,
    message: "USER-ROLE-ERROR",
  };
}
