import { Router } from "express";
import ConfirmRideController from "../controllers/ConfirmRideController";
import ConfirmRideService from "../services/ConfirmRideService";
import RideRepository from "../repositories/RideRepository";
import { validateConfirmRideRequest } from "../validations/ride/validateConfirmRideRequest";

const router = Router();

const rideRepository = new RideRepository();
const confirmRideService = new ConfirmRideService(rideRepository);
const confirmRideController = new ConfirmRideController(confirmRideService);

// Rota com middleware de validação
router.patch(
  "/",
  validateConfirmRideRequest,
  confirmRideController.confirmRide
);

export default router;
