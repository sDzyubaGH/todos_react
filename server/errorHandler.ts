import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import ApiError from "./error/ApiError";

export default function (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) {
  if (error instanceof ApiError) {
    return res.status(error.status).json({ message: error.message })
  }
  return res.status(500).json({ message: "Unknown error" })
}