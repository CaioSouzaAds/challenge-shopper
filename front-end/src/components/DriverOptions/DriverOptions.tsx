import React from "react";
import { Driver } from "../../types/driver";
import { RideDetails } from "../../services/rideService";

interface DriverOptionsProps {
  options?: Driver[];
  customerId: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  onConfirm: (rideDetails: RideDetails) => Promise<void>;
}

const DriverOptions: React.FC<DriverOptionsProps> = ({
  options = [],
  customerId,
  origin,
  destination,
  distance,
  duration,
  onConfirm,
}) => {
  return (
    <div className='p-5 space-y-5'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {options.map((driver) => (
          <div
            key={driver.id}
            className='p-5 border rounded-lg shadow-lg bg-white dark:bg-gray-800'
          >
            <h2 className='text-xl font-semibold'>{driver.name}</h2>
            <p className='text-gray-500'>{driver.description}</p>
            <p className='text-gray-400'>{driver.vehicle}</p>
            <p className='text-gray-400'>Avaliação: {driver.review.rating}</p>
            <p className='text-gray-500'>{driver.review.comment}</p>
            <p className='text-lg font-bold'>R$ {driver.value.toFixed(2)}</p>
            <button
              onClick={() => {
                const payload = {
                  customer_id: customerId,
                  origin,
                  destination,
                  distance,
                  duration,
                  driver: { id: driver.id, name: driver.name },
                  value: driver.value,
                };
                console.log("Payload a ser enviado no onClick:", payload); // Log do payload
                onConfirm(payload);
              }}
              className='mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
            >
              Escolher
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DriverOptions;
