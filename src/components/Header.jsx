import { useContext, useState, useMemo } from "react";
import { Dark } from "../svg";
import { DarkModeContext } from "../context/DarkModeContext";
import { Link } from "react-router-dom"; // Usa Link aquí
import allPlaces from "../mocks/all-places.json";

export const Header = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const [search, setSearch] = useState("");

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredRecomendaciones = useMemo(() => {
    if (!search) {
      return [];
    }

    return allPlaces.filter((place) =>
      place.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  return (
    <header
      id="search"
      className="flex flex-col items-center justify-center w-full h-auto lg:h-[700px] p-5 text-center bg-cover bg-sanFranciscoHeader"
    >
      <div className="flex flex-col items-end w-full mb-96 lg:mb-0">
        <button onClick={handleToggle} className="fixed z-20 mb-5 lg:hidden ">
          <Dark />
        </button>
        <div className="w-11/12 absolute left-4">
          <input
            value={search}
            onChange={searcher}
            type="text"
            name="search"
            id="search"
            placeholder="San Francisco"
            className="w-full h-auto p-3 mx-auto mt-16 dark:bg-slate-800 dark:text-white bg-white rounded-2xl shadow outline-none lg:hidden focus:ring-0"
          />
          {filteredRecomendaciones.length > 0 && (
            <div className="top-40 md:max-h-52 z-10 w-full lg:hidden overflow-y-auto rounded-md shadow-lg max-h-44">
              {filteredRecomendaciones.map((place) => (
                <div
                  key={place.id}
                  className="p-3 border bg-white text-black dark:text-white dark:border-slate-700 cursor-pointer dark:bg-slate-800"
                >
                  <Link
                    to={`/places?id=${place.id}`} // Redirige con el ID como query parameter
                    className="font-semibold text-gray-900 dark:text-white"
                  >
                    {place.title}
                  </Link>
                </div>
              ))}
            </div>
          )}

          {filteredRecomendaciones.length === 0 && search && (
            <div className="p-3 w-full lg:hidden overflow-y-auto rounded-md shadow-lg max-h-44 border bg-white text-black dark:text-white dark:border-slate-700 cursor-pointer dark:bg-slate-800">
              <p className="text-center text-black dark:text-white">
                No hay lugares disponibles
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="absolute hidden mb-40 text-left w-96 lg:left-20 lg:flex">
        <h2 className="text-4xl font-bold text-white dark:text-white">
          Find More Locations like this
        </h2>
      </div>
      <div className="w-full mb-10 lg:mb-7 ">
        <Link to="/places">
          <button className="w-48 text-lg font-semibold bg-white rounded-full lg:absolute lg:left-20 lg:w-48 h-14 text-tertiary dark:text-black">
            Explore More
          </button>
        </Link>
      </div>
    </header>
  );
};
