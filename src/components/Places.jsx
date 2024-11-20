import { useState, useEffect, useContext } from "react";
import allPlaces from "../mocks/all-places.json";
import { DarkModeContext } from "../context/DarkModeContext";
import { ArrowReturn, Dark } from "../svg";
import { Link } from "react-router-dom";

export const Places = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setRecomendaciones(allPlaces);
  }, []);

  return (
    <div className="h-full bg-white p-7 md:p-10 lg:p-16 dark:bg-slate-800">
      <Link to="/" className="absolute left-5 top-5 lg:left-10">
        <ArrowReturn />
      </Link>
      <button
        onClick={handleToggle}
        className="absolute top-5 right-5 lg:right-10"
      >
        <Dark />
      </button>
      <h2 className="mb-6 text-2xl font-bold text-gray-800 mt-14 dark:text-white">
        Explore Our Destinations
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {recomendaciones.map((place) => (
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
        ))}
      </div>
    </div>
  );
};
