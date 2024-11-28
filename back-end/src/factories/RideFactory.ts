import RideEntity from "../entities/RideEntity";
import DriverRepository from "../repositories/DriverRepository";

export default class RideFactory {
  static async createRideEntity(
    customer_id: string,
    origin: string,
    destination: string,
    distance: number,
    duration: string,
    driver_id: number,
    value: number
  ): Promise<RideEntity> {
    const driverEntity = await new DriverRepository().findById(driver_id);

    const ride = new RideEntity();
    ride.customer_id = customer_id;
    ride.origin = origin;
    ride.destination = destination;
    ride.distance = distance;
    ride.duration = duration;
    ride.driver = driverEntity!;
    ride.value = value;

    return ride;
  }
}
