import { ArrowReturn, Dark, User } from "../svg";
import recomendacionesData from "../mocks/recomendaciones.json";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../context/DarkModeContext";
import { Link } from "react-router-dom";

export const Acount = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    setRecomendaciones(recomendacionesData);
  }, []);

  return (
    <div className="min-h-screen p-4 space-y-6 bg-white dark:bg-slate-800">
      <Link to="/" className="absolute left-5 lg:top-10 top-5 lg:left-10">
        <ArrowReturn />
      </Link>
      <button
        onClick={handleToggle}
        className="absolute -top-1 lg:top-4 right-5 lg:right-10"
      >
        <Dark />
      </button>
      <h2 className="mb-5 text-center text-black dark:text-white">Account</h2>

      <header className="profileHeader">
        <User className="mb-4 text-5xl text-gray-500 dark:text-gray-300" />
        <label htmlFor="porfile" className="profileButton">
          Select an image
        </label>
        <input
          type="file"
          accept="image/png,image/jpeg"
          name="porfile"
          id="porfile"
          className="hidden"
        />
        <p className="mt-4 text-lg font-medium text-black dark:text-white">
          User name
        </p>
      </header>

      <article>
        <h2 className="sectionTitle">Trips made</h2>
        <div className="flex flex-row w-auto h-64 gap-4 overflow-x-scroll custom-scroll">
          {recomendaciones.map((lugar, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="cardTrending2"
                style={{ backgroundImage: `url(${lugar.imageClass})` }}
              >
                <div className={isEven ? "cardContentEven" : "cardContentOdd"}>
                  <p className="text-lg font-semibold">{lugar.place}</p>
                  <p className="text-sm">{lugar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </article>

      <article>
        <h2 className="sectionTitle">Upcoming trips</h2>
        <div className="flex flex-row w-auto h-64 gap-4 overflow-x-scroll custom-scroll">
          {recomendaciones.map((lugar, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="cardTrending2"
                style={{ backgroundImage: `url(${lugar.imageClass})` }}
              >
                <div className={isEven ? "cardContentEven" : "cardContentOdd"}>
                  <p className="text-lg font-semibold">{lugar.place}</p>
                  <p className="text-sm">{lugar.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </div>
  );
};
