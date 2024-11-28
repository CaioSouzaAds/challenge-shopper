import { Request, Response } from "express";
import { HttpStatusCodes } from "../http/StatusCodes";
import { ErrorMessages } from "../http/Messages";
import ConfirmRideService from "../services/ConfirmRideService";
import RideFactory from "../factories/RideFactory";
import { ConfirmRideRequest } from "../types/ConfirmRideRequest";

export default class ConfirmRideController {
  constructor(private confirmRideService: ConfirmRideService) {}

  confirmRide = async (req: Request, res: Response): Promise<Response> => {
    const {
      customer_id,
      origin,
      destination,
      distance,
      duration,
      driver,
      value,
    } = req.body as ConfirmRideRequest;

    try {
      const ride = await RideFactory.createRideEntity(
        customer_id,
        origin,
        destination,
        distance,
        duration,
        driver.id,
        value
      );

      // Salvar a viagem no banco de dados usando ConfirmRideService
      const savedRide = await this.confirmRideService.confirmRide(ride);

      return res.status(HttpStatusCodes.OK).json({ success: true });
    } catch (error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorMessages.ESTIMATE_ERROR);
    }
  };
}
