import { Router } from "express";
import RideController from "../controllers/RideController";
import RideService from "../services/RideService";
import DriverRepository from "../repositories/DriverRepository";
import GoogleMapsClient from "../integration/GoogleMapsClient";
import { validateRideRequest } from "../validations/ride/validateRideRequest";

const router = Router();

const driverRepository = new DriverRepository();
const googleMapsClient = new GoogleMapsClient();
const rideService = new RideService(driverRepository, googleMapsClient);
const rideController = new RideController(rideService);

router.post("/", validateRideRequest, rideController.estimateRide);

export default router;
