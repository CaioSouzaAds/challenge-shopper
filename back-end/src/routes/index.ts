import { Router } from "express";
import rideRouter from "./rideRouter";
import confirmRideRouter from "./confirmRideRoute";
import listRidesRoute from "./listRidesRoute";

const router = (app: Router) => {
  app.use("/ride/estimate", rideRouter);
  app.use("/ride/confirm", confirmRideRouter);
  app.use("/rides", listRidesRoute);
};

export default router;
