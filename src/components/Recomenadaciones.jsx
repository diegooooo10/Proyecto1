import { useState, useEffect } from "react";
import recomendacionesData from "../mocks/recomendaciones.json";

export const Recomenadaciones = () => {
  const [recomendaciones, setRecomendaciones] = useState([]);

  useEffect(() => {
    setRecomendaciones(recomendacionesData);
  }, []);

  return (
    <section id="recomendation" className="w-full h-auto p-4 dark:bg-slate-800">
      <h2 className="mb-4 text-2xl font-bold lg:mb-10 text-start dark:text-white text-tertiary">
        Our Recommendations
      </h2>
      <div className="flex flex-row w-auto h-64 gap-6 space-x-5 overflow-x-scroll custom-scroll">
        {recomendaciones.map((lugar, index) => {
          // Alterna las clases según el índice (pares o impares)
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className="flex items-end w-full h-56 bg-center bg-cover rounded-lg shadow-md"
              style={{
                backgroundImage: `url(${lugar.imageClass})`,
              }}
            >
              <div
                className={`w-40 p-4 h-28 rounded-b-lg ${
                  isEven
                    ? "bg-primary text-white dark:bg-slate-600"
                    : "bg-white dark:text-white dark:bg-slate-700 text-secondary"
                }`}
              >
                <p className="text-lg font-semibold">{lugar.place}</p>
                <p className="text-sm">{lugar.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
