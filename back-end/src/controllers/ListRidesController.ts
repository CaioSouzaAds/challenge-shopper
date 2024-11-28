import { Request, Response } from "express";
import { HttpStatusCodes } from "../http/StatusCodes";
import { ErrorMessages } from "../http/Messages";
import ListRidesService from "../services/ListRidesService";
import { GetRidesByCustomerRequest } from "../types/ListRideRequest";

export default class ListRidesController {
  constructor(private listRidesService: ListRidesService) {}

  listRides = async (req: Request, res: Response): Promise<Response> => {
    const { customer_id } = req.params;
    const { driver_id } = req.query;

    const requestData: GetRidesByCustomerRequest = {
      customer_id,
      driver_id: driver_id ? Number(driver_id) : undefined,
    };

    try {
      const rides = await this.listRidesService.execute(
        requestData.customer_id,
        requestData.driver_id
      );

      if (!rides.length) {
        return res
          .status(HttpStatusCodes.NOT_FOUND)
          .json(ErrorMessages.NO_RIDES_FOUND);
      }

      return res.status(HttpStatusCodes.OK).json({
        customer_id: requestData.customer_id,
        rides,
      });
    } catch (error) {
      console.error("Erro ao buscar viagens:", error);

      return res
        .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
        .json(ErrorMessages.ESTIMATE_ERROR);
    }
  };
}
