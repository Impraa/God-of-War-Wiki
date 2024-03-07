import { ErrorAPI } from "./types";

export const isErrorAPI = (error: any): error is ErrorAPI => {
  if (typeof error === "object" && "errors" in error && "message" in error)
    return true;
  return false;
};
