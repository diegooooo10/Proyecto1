import { useState } from "react";
import { Dark } from "../svg";

export const Header = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    if (!toggle) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };
  return (
    <header
      id="search"
      className="flex flex-col items-center justify-center w-full h-auto lg:h-[700px] p-6 text-center bg-cover bg-sanFranciscoHeader"
    >
      <div className="flex flex-col items-end w-full mb-96 lg:mb-0">
        <button onClick={handleToggle} className="fixed mb-5 lg:hidden ">
          <Dark />
        </button>
        <input
          type="search"
          name="buscar"
          id="buscar"
          placeholder="San Francisco"
          className="w-11/12 h-auto p-3 mx-auto mt-16 bg-white rounded-full shadow outline-none lg:hidden focus:ring-0"
        />
      </div>
      <div className="absolute hidden mb-40 text-left w-96 lg:left-20 lg:flex">
        <h2 className="text-4xl font-bold text-white dark:text-white">
          Find More Locations like this
        </h2>
      </div>
      <div className="w-full mb-10 lg:mb-7 ">
        <button className="w-48 text-lg font-semibold bg-white rounded-full lg:absolute lg:left-20 lg:w-48 h-14 text-tertiary dark:text-black">
          Explore More
        </button>
      </div>
    </header>
  );
};
