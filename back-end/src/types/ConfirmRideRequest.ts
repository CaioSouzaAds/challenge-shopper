import DriverEntity from "../entities/DriverEntity";

export interface ConfirmRideRequest {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: { id: number; name: string } | DriverEntity;
  value: number;
}
