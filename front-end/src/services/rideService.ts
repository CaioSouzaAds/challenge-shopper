import api from "./api";
import { showToastError, showToastSuccess } from "../utils/toast";

export interface RideDetails {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
}

interface ApiError {
  response?: {
    data?: {
      error_code?: string;
      error_description?: string;
    };
    status?: number;
  };
  message?: string;
}

export const fetchRideOptions = async (requestBody: {
  customer_id: string;
  origin: string;
  destination: string;
}) => {
  try {
    const endpoint = "/ride/estimate";
    console.log(
      `Chamando a API no endpoint: ${api.defaults.baseURL}${endpoint}`
    );

    const { data } = await api.post(endpoint, requestBody);
    return data;
  } catch (error) {
    const err = error as ApiError;

    if (err.response?.status === 400) {
      showToastError(
        err.response.data?.error_description ||
          "Os dados fornecidos são inválidos."
      );
    } else {
      showToastError(err.message || "Erro ao buscar opções de viagem.");
    }

    throw new Error("Não foi possível buscar as opções de viagem.");
  }
};

// Função para confirmar a viagem
export const confirmRide = async (rideDetails: RideDetails) => {
  try {
    const { data } = await api.patch("/ride/confirm", rideDetails);
    showToastSuccess("Viagem confirmada com sucesso!");
    return data;
  } catch (error) {
    const err = error as ApiError;

    if (err.response?.status === 400) {
      showToastError(
        err.response.data?.error_description || "Dados inválidos."
      );
    } else if (err.response?.status === 404) {
      showToastError(
        err.response.data?.error_description || "Motorista não encontrado."
      );
    } else if (err.response?.status === 406) {
      showToastError(
        err.response.data?.error_description || "Quilometragem inválida."
      );
    } else {
      showToastError(err.message || "Erro ao confirmar a viagem.");
    }

    throw new Error("Não foi possível confirmar a viagem.");
  }
};

export const fetchRideHistory = async (userId: string, driverId?: string) => {
  try {
    // Construindo o endpoint dinamicamente com base na baseURL do axios
    let endpoint = `/rides/${userId}`;
    if (driverId) {
      endpoint += `?driver_id=${driverId}`;
    }

    // Utilizando o `api` do axios configurado
    const { data } = await api.get(endpoint);
    return data;
  } catch (error) {
    const err = error as ApiError;

    if (
      err.response?.status === 400 &&
      err.response.data?.error_code === "INVALID_DRIVER"
    ) {
      throw new Error(
        "Motorista inválido. Verifique a seleção e tente novamente."
      );
    }

    if (
      err.response?.status === 404 &&
      err.response.data?.error_code === "NO_RIDES_FOUND"
    ) {
      throw new Error("Nenhum registro encontrado para os filtros aplicados.");
    }

    // Tratamento de erros inesperados
    throw new Error(
      `Erro inesperado: ${err.response?.status || "Status desconhecido"} - ${
        err.response?.data?.error_description ||
        err.message ||
        "Erro desconhecido"
      }`
    );
  }
};
