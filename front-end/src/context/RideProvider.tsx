import React, { useState, ReactNode } from "react";
import { RideContext, RideContextType } from "./RideContext";

// Inicializa os dados do contexto
const initialRideData = {
  options: [],
  originCoords: null,
  destinationCoords: null,
  distance: null,
  duration: null,
  customerId: null,
  origin: null,
  destination: null,
};

// Provedor do contexto
export const RideProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [rideData, setRideDataState] = useState<RideContextType>({
    ...initialRideData,
    setRideData: (data: Partial<RideContextType>) => {
      setRideDataState((prev) => ({ ...prev, ...data }));
    },
  });

  return (
    <RideContext.Provider value={rideData}>{children}</RideContext.Provider>
  );
};
