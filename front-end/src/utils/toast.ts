import { toast, ToastOptions, ToastPosition } from "react-toastify";

// Configuração padrão do Toast
const toastConfig: ToastOptions = {
  position: "top-right" as ToastPosition, // Tipo correto
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "light", // Opções: "light", "dark", "colored"
};

// Funções auxiliares para exibir mensagens Toast
export const showToastSuccess = (message: string) => {
  toast.success(message, toastConfig);
};

export const showToastError = (message: string) => {
  toast.error(message, toastConfig);
};

export const showToastInfo = (message: string) => {
  toast.info(message, toastConfig);
};

export const showToastWarning = (message: string) => {
  toast.warn(message, toastConfig);
};
