import { useState, useContext, useMemo } from "react";
import allPlaces from "../mocks/all-places.json";
import { DarkModeContext } from "../context/DarkModeContext";
import { ArrowReturn, Dark } from "../svg";
import { Link } from "react-router-dom";

export const Places = () => {
  const [search, setSearch] = useState("");

  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const filteredRecomendaciones = useMemo(() => {
    if (!search) {
      return allPlaces;
    }

    return allPlaces.filter((place) =>
      place.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen p-5 bg-white md:p-8 dark:bg-slate-800">
      <div className="flex items-center justify-between lg:p-1 lg:px-2 lg:pb-0.5">
        <Link to="/" className="">
          <ArrowReturn />
        </Link>

        <input
          value={search}
          onChange={searcher}
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          className="hidden p-2 text-lg text-black bg-gray-100 border rounded-full shadow-xl outline-none lg:flex dark:border-slate-700 dark:bg-white w-60 focus:ring-0"
        />

        <button onClick={handleToggle} className="">
          <Dark />
        </button>
      </div>
      <h2 className="mb-6 text-2xl font-bold text-gray-800 mt-14 dark:text-white">
        Explore Our Destinations
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">

      {filteredRecomendaciones.length > 0 ? (
          filteredRecomendaciones.map((place) => (
            <div
              key={place.id}
              className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-slate-700"
            >
              <img
                src={place.img}
                alt={place.title}
                className="object-cover w-full h-40"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {place.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {place.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-6 text-lg text-center text-black dark:text-white">
            No hay lugares disponibles
          </p>
        )}
      </div>
    </div>
  );
};
