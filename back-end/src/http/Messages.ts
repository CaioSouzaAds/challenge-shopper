export const ErrorMessages = {
  INVALID_REQUEST: {
    error_code: "INVALID_DATA",
    error_description:
      "Os dados fornecidos no corpo da requisição são inválidos.",
  },
  MISSING_IDENTIFIERS: {
    error_code: "MISSING_IDENTIFIERS",
    error_description: "Informe 'customer_id.",
  },
  SAME_ORIGIN_DESTINATION: {
    error_code: "SAME_ORIGIN_DESTINATION",
    error_description: "Os endereços de origem e destino não podem ser iguais.",
  },
  MISSING_FIELDS: {
    error_code: "MISSING_FIELDS",
    error_description: "Os campos 'origin' e 'destination' são obrigatórios.",
  },
  ESTIMATE_ERROR: {
    error_code: "ESTIMATE_ERROR",
    error_description: "Erro ao estimar corrida.",
  },
  DRIVER_NOT_FOUND: {
    error_code: "DRIVER_NOT_FOUND",
    error_description: "O motorista informado não foi encontrado.",
  },
  INVALID_DRIVER: {
    error_code: "INVALID_DRIVER",
    error_description: "Motorista inválido.",
  },
  INVALID_DISTANCE: {
    error_code: "INVALID_DISTANCE",
    error_description:
      "A distância informada é inválida para o motorista selecionado.",
  },
  NO_RIDES_FOUND: {
    error_code: "NO_RIDES_FOUND",
    error_description: "Nenhum registro encontrado.",
  },

  INVALID_VALUE: {
    error_code: "INVALID_VALUE",
    error_description:
      "O campo 'value' deve ser um número válido e maior que zero.",
  },
};

export const SuccessMessages = {
  OPERATION_SUCCESS: (description = "Operação realizada com sucesso.") => ({
    description,
  }),
};
