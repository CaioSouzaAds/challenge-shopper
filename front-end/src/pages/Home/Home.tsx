import { TruckIcon } from "@heroicons/react/24/solid";
import Form from "../../components/Form/Form";
import { RideEstimateRequest } from "../../types/form";
import { fetchRideOptions } from "../../services/rideService";
import useAppNavigation from "../../hooks/useAppNavigation";
import useRide from "../../context/useRide";

const Home = () => {
  const { goToOptions } = useAppNavigation();
  const { setRideData } = useRide();

  const handleSubmit = async (data: RideEstimateRequest) => {
    try {
      const response = await fetchRideOptions(data);

      setRideData({
        options: response.options,
        originCoords: response.origin,
        destinationCoords: response.destination,
        distance: response.distance,
        duration: response.duration,
        customerId: data.customer_id,
        origin: data.origin,
        destination: data.destination,
      });

      goToOptions();
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
    }
  };

  return (
    <div className='h-screen flex flex-col justify-start items-center space-y-5 px-5 pt-10'>
      <h1 className='text-3xl font-bold mb-3'>
        Vá a qualquer lugar com o app da Shopper
      </h1>

      <TruckIcon className='h-12 w-12 text-gray-800 dark:text-gray-200' />
      <span className='text-sm font-medium text-gray-800 dark:text-gray-200 mb-5'>
        Viajar
      </span>

      <div className='w-full'>
        <Form onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default Home;
