import { useContext } from "react";
import { RideContext, RideContextType } from "./RideContext";

const useRide = (): RideContextType => {
  const context = useContext(RideContext);
  if (!context) {
    throw new Error("useRide deve ser usado dentro de um RideProvider");
  }
  return context;
};

export default useRide;
