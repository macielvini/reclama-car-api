import httpStatus from "http-status";
import { ApplicationError } from "../protocols";

export function reviewWithoutTagsError(): ApplicationError {
  return {
    status: httpStatus.FORBIDDEN,
    message: "Need at least one tag to re-post a review",
    type: "reviewWithoutTagsError",
  };
}

export function tagInvalidError(): ApplicationError {
  return {
    status: httpStatus.UNPROCESSABLE_ENTITY,
    message: "Invalid tag ID",
    type: "invalidTagError",
  };
}
