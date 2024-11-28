export interface GoogleMapsRouteResponse {
  routes: {
    legs: {
      distanceMeters: number; // Distância em metros
      duration: string; // Duração como string (ex: '21145s')
      startLocation: {
        latLng: {
          latitude: number; // Latitude do ponto inicial
          longitude: number; // Longitude do ponto inicial
        };
      };
      endLocation: {
        latLng: {
          latitude: number; // Latitude do ponto final
          longitude: number; // Longitude do ponto final
        };
      };
    }[];
  }[];
}
