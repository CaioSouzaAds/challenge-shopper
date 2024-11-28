import RideRepository from "../repositories/RideRepository";
import DriverRepository from "../repositories/DriverRepository";
import { RideSummary } from "../types/RideSummary";

export default class ListRidesService {
  constructor(
    private rideRepository: RideRepository,
    private driverRepository: DriverRepository
  ) {}

  async execute(
    customer_id: string,
    driver_id?: number
  ): Promise<RideSummary[]> {
    if (driver_id) {
      const driverExists = await this.driverRepository.findById(driver_id);
      if (!driverExists) {
        throw new Error("DRIVER_NOT_FOUND");
      }
    }

    const rides = await this.rideRepository.findByCustomerAndDriver(
      customer_id,
      driver_id
    );

    return rides.map((ride) => ({
      id: ride.id,
      date: ride.date,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.driver.id,
        name: ride.driver.name,
      },
      value: ride.value,
    }));
  }
}
