import React from "react";
import { RideEstimateRequest } from "../../types/form";
import Input from "../Input/Input";

const Form = ({
  onSubmit,
}: {
  onSubmit: (data: RideEstimateRequest) => void;
}) => {
  const safeSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.target as HTMLFormElement;

    const customer_id = form.customer_id.value;
    const origin = form.origin.value;
    const destination = form.destination.value;

    onSubmit({ customer_id, origin, destination });
    form.reset();
  };

  return (
    <form
      onSubmit={safeSubmit}
      className='h-full flex flex-col items-center justify-center gap-6 mx-5 sm:mx-auto sm:w-full sm:max-w-2xl'
    >
      <Input
        type='text'
        name='customer_id'
        placeholder='Insira o ID do Usuário...'
        required
      />

      <Input
        type='text'
        name='origin'
        placeholder='Insira o endereço de origem...'
        required
      />

      <Input
        type='text'
        name='destination'
        placeholder='Insira o endereço de destino...'
        required
      />

      <button
        type='submit'
        className='py-3 px-5 w-full max-w-lg bg-blue-500 dark:bg-dark-200 rounded-full text-gray-200 uppercase hover:bg-blue-600'
      >
        Solicitar Viagem
      </button>
    </form>
  );
};

export default Form;
