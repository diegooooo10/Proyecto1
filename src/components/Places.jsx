import { useState, useContext, useMemo, useEffect } from "react";
import allPlaces from "../mocks/all-places.json";
import { DarkModeContext } from "../context/DarkModeContext";
import { ArrowReturn, CircleCheck, Dark } from "../svg";
import { Link, useSearchParams } from "react-router-dom";
import { Element, scroller } from "react-scroll";
import { ModalPlaces } from "./ModalPlaces";
import { ModalMadeTrip } from "./ModalMadeTrip";

export const Places = () => {
  const [search, setSearch] = useState("");
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalMade, setModalMade] = useState(false);

  const [searchParams] = useSearchParams();
  const targetId = searchParams.get("id");

  useEffect(() => {
    if (targetId) {
      scroller.scrollTo(targetId, {
        smooth: true,
        offset: -10,
        duration: 500,
      });
    }
  }, [targetId]);

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
  const openModal = (place) => {
    setSelectedPlace(place); // Establece el lugar seleccionado
    setModal(true); // Abre el modal
  };
  const openModalMade = (place) => {
    setSelectedPlace(place); // Establece el lugar seleccionado
    setModalMade(true); // Abre el modal
  };

  const closeModal = () => {
    setModal(false); // Cierra el modal
    setSelectedPlace(null); // Limpia el lugar seleccionado
  };
  const closeModalMade = () => {
    setModalMade(false); // Cierra el modal
    setSelectedPlace(null); // Limpia el lugar seleccionado
  };

  return (
    <div className="min-h-screen p-5 bg-white md:p-8 dark:bg-slate-800">
      <div className="flex items-center justify-between lg:p-1 lg:px-2 lg:pb-0.5">
        <div></div>
        <Link to="/" className="fixed">
          <ArrowReturn />
        </Link>

        <input
          value={search}
          onChange={searcher}
          type="text"
          name="search"
          id="search"
          placeholder="Search..."
          className="hidden p-2 text-lg text-black duration-300 bg-gray-100 border rounded-full shadow-xl outline-none focus:w-96 transition-al focus:duration-300 lg:flex dark:border-slate-700 dark:bg-white w-60 focus:ring-0"
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
            <Element key={place.id} name={place.id.toString()}>
              <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-slate-700">
                <img
                  src={place.img}
                  alt={place.title}
                  loading="lazy"
                  className="object-cover w-full h-40"
                />
                <div className="p-4 space-y-3">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {place.title}
                    </h3>
                    <p className="text-right text-gray-700 dark:text-gray-300">
                      {place.price}
                    </p>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">
                    {place.description}
                  </p>
                  <div className="flex justify-center space-x-5">


                  <button
                    onClick={() => openModal(place)}
                    className="p-3 text-white bg-blue-700 rounded-md hover:opacity-80"
                  >
                    Reserve
                  </button>
                  <button 
                  onClick={() => openModalMade(place)}
                  className="p-3 text-white bg-green-700 rounded-md hover:opacity-50"
                  >
                    <CircleCheck/>
                  </button>
                  </div>
                </div>
              </div>
            </Element>
          ))
        ) : (
          <p className="col-span-6 text-lg text-center text-black dark:text-white">
            There are no places available
          </p>
        )}
      </div>
      {modal && selectedPlace && (
        <ModalPlaces place={selectedPlace} onClose={closeModal} />
      )}
      {modalMade && selectedPlace && (
        <ModalMadeTrip place={selectedPlace} onClose={closeModalMade} />
      )}
    </div>
  );
};
