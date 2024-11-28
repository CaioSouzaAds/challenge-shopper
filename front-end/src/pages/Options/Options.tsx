import useAppNavigation from "../../hooks/useAppNavigation";
import DriverOptions from "../../components/DriverOptions/DriverOptions";
import Map from "../../components/Map/Map";
import { confirmRide, RideDetails } from "../../services/rideService";
import useRide from "../../context/useRide";

const Options = () => {
  const { goToHistory } = useAppNavigation();
  const {
    customerId,
    origin,
    destination,
    originCoords,
    destinationCoords,
    options,
    distance,
    duration,
  } = useRide();

  if (
    !customerId ||
    !origin ||
    !destination ||
    !options.length ||
    !distance ||
    !duration
  ) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <p className='text-red-500 text-center'>
          Erro: Dados insuficientes para carregar as opções de motoristas.
        </p>
      </div>
    );
  }

  const handleConfirm = async (rideDetails: RideDetails) => {
    try {
      await confirmRide(rideDetails);
      goToHistory();
    } catch (error) {
      console.error("Erro ao confirmar a viagem:", error);
    }
  };

  return (
    <div className='h-screen'>
      <h1 className='text-2xl font-bold text-center mb-5'>
        Opções de Motoristas
      </h1>
      {originCoords && destinationCoords ? (
        <Map origin={originCoords} destination={destinationCoords} />
      ) : (
        <p className='text-red-500'>Erro: Dados do mapa não disponíveis.</p>
      )}
      <div className='text-center mb-4'>
        <p className='text-gray-700'>
          <strong>Distância:</strong> {distance} km
        </p>
        <p className='text-gray-700'>
          <strong>Duração:</strong> {duration}
        </p>
      </div>
      <DriverOptions
        options={options}
        customerId={customerId}
        origin={origin}
        destination={destination}
        distance={distance}
        duration={duration}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default Options;
