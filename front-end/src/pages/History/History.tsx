import { useState, useEffect } from "react";
import FilterForm from "../../components/FilterForm/FilterForm";
import TripsList from "../../components/TripsList/TripsList";
import useRide from "../../context/useRide";
import { fetchRideHistory } from "../../services/rideService";
import useAppNavigation from "../../hooks/useAppNavigation";

const History = () => {
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [filters, setFilters] = useState({ userId: "", driverId: "all" });
  const { customerId, options } = useRide();
  const { goToHome } = useAppNavigation();

  console.log("Contexto de uso (useRide):", { customerId, options });

  const handleFilter = (newFilters: {
    userId: string;
    driverId: string | "all";
  }) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      setError(undefined);

      try {
        console.log("Filtros aplicados:", filters);

        const data = await fetchRideHistory(
          filters.userId,
          filters.driverId !== "all" ? filters.driverId : undefined
        );

        console.log("Dados recebidos:", data);

        setTrips(data.rides || []);
      } catch (err: unknown) {
        console.error("Erro ao buscar viagens:", err);

        if (err instanceof Error) {
          if (err.message.includes("Motorista inválido")) {
            setError(
              "Motorista inválido. Verifique a seleção e tente novamente."
            );
          } else if (err.message.includes("Nenhum registro encontrado")) {
            setError("Nenhum registro encontrado para os filtros aplicados.");
            setTrips([]);
          } else {
            setError("Erro ao carregar viagens. Tente novamente.");
          }
        } else {
          setError("Ocorreu um erro inesperado.");
        }

        setTrips([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (filters.userId) {
      fetchTrips();
    }
  }, [filters]);

  return (
    <div className='space-y-5'>
      <h1 className='text-2xl font-bold text-center'>Histórico de Viagens</h1>
      <FilterForm
        onFilter={handleFilter}
        customerId={customerId || ""}
        drivers={options}
      />

      <div className='text-center space-y-4'>
        <button
          onClick={goToHome}
          className='w-[24.5%] bg-red-500 text-white py-[13px] rounded hover:bg-red-600'
        >
          Voltar para Home
        </button>
      </div>

      {error && <p className='text-red-500 text-center'>{error}</p>}

      <TripsList trips={trips} isLoading={isLoading} />
    </div>
  );
};

export default History;
