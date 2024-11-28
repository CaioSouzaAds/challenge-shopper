import { Router } from "express";
import ListRidesController from "../controllers/ListRidesController";
import ListRidesService from "../services/ListRidesService";
import RideRepository from "../repositories/RideRepository";
import DriverRepository from "../repositories/DriverRepository";
import { validateListRides } from "../validations/ride/validateListRides";
import { HttpStatusCodes } from "../http/StatusCodes";
import { ErrorMessages } from "../http/Messages";

const router = Router();

// Instâncias necessárias
const rideRepository = new RideRepository();
const driverRepository = new DriverRepository();
const listRidesService = new ListRidesService(rideRepository, driverRepository);
const listRidesController = new ListRidesController(listRidesService);

router.get("/", (_, res) => {
  return res
    .status(HttpStatusCodes.BAD_REQUEST)
    .json(ErrorMessages.INVALID_REQUEST);
});

// Define a rota com o middleware
router.get("/:customer_id", validateListRides, listRidesController.listRides);

export default router;
