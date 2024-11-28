import React from "react";
import { format, parseISO } from "date-fns";

interface Trip {
  id: number;
  date: string;
  driver: {
    id: number;
    name: string;
  };
  origin: string;
  destination: string;
  distance: string | number;
  duration: number | string;
  value: string | number;
}

interface TripsListProps {
  trips?: Trip[];
  isLoading?: boolean;
  error?: string;
}

const TripsList: React.FC<TripsListProps> = ({
  trips = [],
  isLoading = false,
  error,
}) => {
  console.log("TripsList props:", trips);

  if (isLoading) {
    return <p className="text-center text-blue-500">Carregando viagens...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erro: {error}</p>;
  }

  if (!trips.length) {
    return (
      <p className="text-center text-gray-500">Nenhuma viagem encontrada.</p>
    );
  }

  const formatTripDuration = (duration: number | string) => {
    let durationInMinutes = 0;

    if (typeof duration === "string") {
      durationInMinutes = parseInt(duration, 10);
    } else {
      durationInMinutes = duration;
    }

    if (isNaN(durationInMinutes)) {
      return "00:00";
    }

    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;

    return `${hours}h:${minutes.toString().padStart(2, "0")}`;
  };

  return (
    <div className="px-5 sm:rounded-xl sm:m-5">
      <table className="w-full border-collapse bg-white rounded shadow-md">
        <thead>
          <tr>
            <th className="border-b p-3 text-left">Data e Hora</th>
            <th className="border-b p-3 text-left">Motorista</th>
            <th className="border-b p-3 text-left">Origem</th>
            <th className="border-b p-3 text-left">Destino</th>
            <th className="border-b p-3 text-left">Distância</th>
            <th className="border-b p-3 text-left">Tempo</th>
            <th className="border-b p-3 text-left">Valor</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id} className="hover:bg-gray-100">
              <td className="border-b p-3">
                {trip.date
                  ? format(parseISO(trip.date), "dd/MM/yyyy HH:mm")
                  : "N/A"}
              </td>
              <td className="border-b p-3">{trip.driver?.name || "N/A"}</td>
              <td className="border-b p-3">{trip.origin}</td>
              <td className="border-b p-3">{trip.destination}</td>
              <td className="border-b p-3">
                {typeof trip.distance === "number"
                  ? `${trip.distance.toFixed(2)} km`
                  : trip.distance}
              </td>
              <td className="border-b p-3">{formatTripDuration(trip.duration)}</td>
              <td className="border-b p-3">
                {typeof trip.value === "number"
                  ? `R$ ${trip.value.toFixed(2)}`
                  : trip.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripsList;
