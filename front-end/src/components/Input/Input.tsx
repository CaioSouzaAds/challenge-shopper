import React from "react";

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return (
    <input
      className='py-3 px-5 w-full max-w-lg dark:bg-dark-200 text-dark-200 dark:bg-gray-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500'
      {...props}
    />
  );
};

export default Input;
