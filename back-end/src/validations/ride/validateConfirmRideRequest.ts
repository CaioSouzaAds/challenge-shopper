import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "../../http/StatusCodes";
import { ErrorMessages } from "../../http/Messages";
import { ConfirmRideRequest } from "../../types/ConfirmRideRequest";
import DriverRepository from "../../repositories/DriverRepository";

const driverRepository = new DriverRepository();

export const validateConfirmRideRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    customer_id,
    origin,
    destination,
    distance,
    driver,
    value,
  }: ConfirmRideRequest = req.body;

  // Verifica campos obrigatórios
  if (
    !origin ||
    !destination ||
    !customer_id ||
    !driver?.id ||
    value === undefined
  ) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(ErrorMessages.INVALID_REQUEST);
  }

  // Verifica se origem e destino são iguais
  if (origin === destination) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(ErrorMessages.SAME_ORIGIN_DESTINATION);
  }

  // Verifica se o valor é numérico e maior que zero
  if (typeof value !== "number" || isNaN(value) || value <= 0) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json(ErrorMessages.INVALID_VALUE);
  }

  // Verifica se o motorista existe
  const driverExists = await driverRepository.findById(driver.id);
  if (!driverExists) {
    return res
      .status(HttpStatusCodes.NOT_FOUND)
      .json(ErrorMessages.DRIVER_NOT_FOUND);
  }

  // Verifica se a distância é válida para o motorista
  if (distance < driverExists.min_distance) {
    return res
      .status(HttpStatusCodes.NOT_ACCEPTABLE)
      .json(ErrorMessages.INVALID_DISTANCE);
  }

  next();
};
