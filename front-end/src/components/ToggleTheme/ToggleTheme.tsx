import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";

const ToggleTheme = () => {
  const pageClasses = document.documentElement.classList; // Constante para classList

  useEffect(() => {
    const systemPreference = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    if (systemPreference) {
      pageClasses.add("dark");
    }
  }, [pageClasses]);

  const toggle = () => {
    pageClasses.toggle("dark");
  };

  return (
    <div className='hidden sm:block'>
      <MoonIcon
        className='h-8 text-gray-100 cursor-pointer block dark:hidden'
        onClick={toggle}
      />
      <SunIcon
        className='h-8 text-gray-100 cursor-pointer hidden dark:block'
        onClick={toggle}
      />
    </div>
  );
};

export default ToggleTheme;
