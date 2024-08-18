import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";
const ThemeToggle: React.FC = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme == "light" ? "dark" : "light")}
      className="rounded-full border text-center flex justify-center items-center lg:p-3 p-2 absolute top-2 right-4 hover:bg-yellow-500 hover:text-white hover:border-yellow-500 dark:hover:bg-black  dark:hover:border-black"
    >
      <div className="relative flex justify-center items-center">
        <Sun
          className={`h-[1.1rem] transition-all w-[1.1rem] ${
            theme == "light"
              ? "rotate-0 opacity-100"
              : "dark:rotate-90 dark:opacity-0"
          }`}
        />
        <Moon
          className={`dark:text-white dark:fill-slate-300 absolute transition-all h-[1.1rem] w-[1.1rem] 
          ${
            theme == "light"
              ? "-rotate-90 opacity-0"
              : "dark:opacity-100 dark:rotate-0 z-0"
          } `}
        />
      </div>
    </button>
  );
};

export default ThemeToggle;
