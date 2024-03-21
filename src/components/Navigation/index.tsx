import { PencilIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button/index";
import Select from "../Select";

const Navbar = () => {
  const navigate = useNavigate();

  const themeArray = ["light", "dark", "system"];
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || themeArray[2];
  });

  const applyTheme = (selectedTheme: string) => {
    const isDarkModePreferred = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(selectedTheme);

    if (selectedTheme === "system") {
      document.documentElement.classList.toggle("dark", isDarkModePreferred);
      document.documentElement.classList.toggle("light", !isDarkModePreferred);
    }
  };

  const handleSelectTheme = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTheme = e.target.value;
    setTheme(selectedTheme);

    // Store the selected theme in localStorage
    localStorage.setItem("theme", selectedTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <nav className="fixed top-0 w-full py-4 border-b-2 shadow-md border-container shadow-gray-400 bg-base">
      <ul className="flex items-center justify-between w-11/12 mx-auto">
        <Link to="/">
          <Button>
            <span className="font-semibold text-main">Taskwrite</span>
            <PencilIcon height={20} className="text-main" />
          </Button>
        </Link>
        <div className="flex items-center justify-between gap-6">
          <Link
            to="/tasks"
            className="font-semibold transition duration-300 ease-in-out hover:scale-105"
          >
            View Tasks
          </Link>
          <div className="flex items-center gap-2">
            <span className="font-semibold"> Theme: </span>
            <Select
              defaultSelectValue={theme}
              selectOptions={themeArray}
              handleSelectChange={handleSelectTheme}
            />
          </div>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
