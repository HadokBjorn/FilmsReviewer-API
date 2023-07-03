import { Error } from "@/types/users.types";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export default function errorHandler(error:Error, req:Request, res:Response, next:NextFunction) {
  console.log(error);

  if (error.type === "ConflictError") {
    return res.status(httpStatus.CONFLICT).send(error.message);
  }

  if (error.type === "NotFoundError") {
    return res.status(httpStatus.CONFLICT).send(error.message);
  }
  if (error.type === "UnauthorizedError") {
    return res.status(httpStatus.UNAUTHORIZED).send(error.message);
  }
  if (error.type === "UnprocessableEntityError") {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send("Sorry, something went wrong 😢");
}