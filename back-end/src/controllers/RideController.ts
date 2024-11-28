import { Request, Response } from "express";
import RideService from "../services/RideService";
import { HttpStatusCodes } from "../http/StatusCodes";
import { ErrorMessages, SuccessMessages } from "../http/Messages";
import { RideEstimateRequest } from "../types/RideEstimateRequest";

export default class RideController {
  constructor(private rideService: RideService) {}

  estimateRide = async (req: Request, res: Response): Promise<Response> => {
    const { customer_id, origin, destination }: RideEstimateRequest = req.body;

    try {
      const rideEstimate = await this.rideService.calculateRoute(
        origin,
        destination
      );

      // Responder ao cliente com a estimativa formatada (com descrição de sucesso)
      return res.status(HttpStatusCodes.OK).json({
        ...SuccessMessages.OPERATION_SUCCESS(),
        ...rideEstimate,
      });
    } catch (error) {
      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorMessages.ESTIMATE_ERROR);
    }
  };
}
