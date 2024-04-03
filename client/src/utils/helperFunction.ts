import { ErrorAPI, Post } from "./types";

export const isErrorAPI = (error: any): error is ErrorAPI => {
  if (typeof error === "object" && "errors" in error && "message" in error)
    return true;
  return false;
};

export const isPost = (post: any): post is Post => {
  if (
    typeof post === "object" &&
    !Array.isArray(post) &&
    "id" in post &&
    "name" in post &&
    "description" in post &&
    "type" in post
  )
    return true;
  return false;
};
