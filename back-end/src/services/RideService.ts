import DriverRepository from "../repositories/DriverRepository";
import GoogleMapsClient from "../integration/GoogleMapsClient";
import { GoogleMapsRouteResponse } from "../types/GoogleMapsTypes";

export default class RideService {
  constructor(
    private driverRepository: DriverRepository,
    private googleMapsClient: GoogleMapsClient
  ) {}

  async calculateRoute(origin: string, destination: string) {
    // Delegar à integração
    const routeResponse: GoogleMapsRouteResponse =
      await this.googleMapsClient.calculateRoute(origin, destination);

    const legs = routeResponse.routes[0].legs[0];
    const distance = legs.distanceMeters / 1000; // Converter para km

    // Ajustar conversão da duração
    const durationInSeconds = parseInt(legs.duration.replace("s", ""), 10);
    const duration = Math.ceil(durationInSeconds / 60);

    const availableDrivers = await this.getAvailableDrivers(distance);

    const formattedDrivers = availableDrivers.map((driver) => ({
      id: driver.id,
      name: driver.name,
      description: driver.description,
      vehicle: driver.vehicle,
      review: {
        rating: `${driver.rating}/5`,
        comment: `Taxa: R$${driver.rate_per_km}/km, mínimo ${driver.min_distance} km`,
      },
      value: Math.max(
        distance * driver.rate_per_km,
        driver.min_distance * driver.rate_per_km
      ),
    }));

    return {
      origin: {
        latitude: legs.startLocation.latLng.latitude,
        longitude: legs.startLocation.latLng.longitude,
      },
      destination: {
        latitude: legs.endLocation.latLng.latitude,
        longitude: legs.endLocation.latLng.longitude,
      },
      distance,
      duration: `${duration} minutos`, // Formatação consistente
      options: formattedDrivers,
      routeResponse, // Resposta original para debugging
    };
  }

  async getAvailableDrivers(distance: number) {
    const drivers = await this.driverRepository.findAll();
    const availableDrivers = drivers.filter(
      (driver) => distance >= driver.min_distance
    );
    return availableDrivers;
  }
}
