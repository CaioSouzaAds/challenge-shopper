import axios from "axios";
import { GoogleMapsRouteResponse } from "../types/GoogleMapsTypes";

export default class GoogleMapsClient {
  private readonly apiKey: string;

  constructor() {
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      throw new Error("Chave da API não encontrada. Verifique GOOGLE_API_KEY.");
    }
    this.apiKey = apiKey;
  }

  async calculateRoute(
    origin: string,
    destination: string
  ): Promise<GoogleMapsRouteResponse> {
    const url = `https://routes.googleapis.com/directions/v2:computeRoutes`;
    const requestBody = {
      origin: {
        address: origin,
      },
      destination: {
        address: destination,
      },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_AWARE",
    };

    try {
      const response = await axios.post<GoogleMapsRouteResponse>(
        url,
        requestBody,
        {
          headers: {
            "X-Goog-Api-Key": this.apiKey,
            "Content-Type": "application/json",
            "X-Goog-FieldMask":
              "routes.legs.distanceMeters,routes.legs.duration,routes.legs.startLocation,routes.legs.endLocation",
          },
        }
      );

      if (
        !response.data ||
        !response.data.routes ||
        response.data.routes.length === 0
      ) {
        throw new Error("Erro ao calcular rota: Nenhuma rota encontrada.");
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
