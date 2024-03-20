import { PencilIcon } from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 w-full py-4 border-b-2 shadow-md border-container shadow-gray-400 bg-base">
      <ul className="flex items-center justify-between w-11/12 mx-auto">
        <Link to="/">
          <Button textClasses="font-semibold text-main" iconClasses="text-main">
            Taskwrite <PencilIcon className="fill-black" />
          </Button>
        </Link>

        <div className="flex items-center justify-between gap-6">
          <Link
            to="/tasks"
            className="font-semibold transition duration-300 ease-in-out hover:scale-105"
          >
            View Tasks
          </Link>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
