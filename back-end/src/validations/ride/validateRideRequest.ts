// src/validations/ride/validateRideRequest.ts
import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../../http/StatusCodes";
import { ErrorMessages } from "../../http/Messages";

export const validateRideRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { origin, destination, customer_id } = req.body;

  if (!origin || !destination || !customer_id) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(ErrorMessages.INVALID_REQUEST);
  }

  if (origin === destination) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(ErrorMessages.INVALID_REQUEST);
  }

  next();
};
