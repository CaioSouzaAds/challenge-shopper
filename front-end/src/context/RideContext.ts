import { createContext } from "react";
import { Driver } from "../types/driver";

// Define os tipos dos dados do contexto
interface RideData {
  options: Driver[];
  originCoords: { latitude: number; longitude: number } | null;
  destinationCoords: { latitude: number; longitude: number } | null;
  distance: number | null;
  duration: string | null;
  customerId: string | null;
  origin: string | null;
  destination: string | null;
}

export interface RideContextType extends RideData {
  setRideData: (data: Partial<RideData>) => void;
}

// Cria o contexto
export const RideContext = createContext<RideContextType | undefined>(
  undefined
);
