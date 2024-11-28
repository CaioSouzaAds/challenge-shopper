import React, { useState, useEffect } from "react";

interface Driver {
  id: number;
  name: string;
}

interface FilterFormProps {
  onFilter: (filters: { userId: string; driverId: string | "all" }) => void;
  customerId: string; // ID do cliente vindo do contexto
  drivers: Driver[]; // Lista de motoristas
}

const FilterForm: React.FC<FilterFormProps> = ({
  onFilter,
  customerId,
  drivers,
}) => {
  const [userId, setUserId] = useState(customerId);
  const [driverId, setDriverId] = useState("all");

  useEffect(() => {
    setUserId(customerId);
  }, [customerId]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Enviando filtros:");
    console.log("userId:", userId);
    console.log("driverId:", driverId);
    onFilter({ userId, driverId });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-5 bg-white rounded shadow-md space-y-4 px-5 sm:rounded-xl sm:m-5'
    >
      <div>
        <label htmlFor='userId' className='block text-sm font-bold'>
          ID do Usuário
        </label>
        <input
          type='text'
          id='userId'
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder='Digite o ID do usuário'
          className='w-full p-2 border rounded'
          required
        />
      </div>
      <div>
        <label htmlFor='driverId' className='block text-sm font-bold'>
          Motorista
        </label>
        <select
          id='driverId'
          value={driverId}
          onChange={(e) => setDriverId(e.target.value)}
          className='w-full p-2 border rounded'
        >
          <option value='all'>Todos</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
      </div>
      <div className='flex justify-center'>
        <button
          type='submit'
          className='w-1/4 bg-blue-500 text-white py-[13px] rounded hover:bg-blue-600'
        >
          Aplicar Filtro
        </button>
      </div>
    </form>
  );
};

export default FilterForm;
