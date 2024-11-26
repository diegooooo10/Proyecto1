import { useEffect, useState } from "react";
import { ReservePlacesContext } from "./ReservePlacesContext";

const STORAGE_KEY = "places";

export const ReservePlacesProvider = ({ children }) => {
  // Inicializa los datos desde localStorage o usa los datos iniciales
  const [places, setPlaces] = useState(() => {
    const storedPlaces = localStorage.getItem(STORAGE_KEY);
    return storedPlaces ? JSON.parse(storedPlaces) : [];
  });

  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [tripsMade, setTripsMade] = useState([]);

  // Categoriza los viajes como futuros o pasados
  const categorizeTrips = (places) => {
    const now = new Date();
    return {
      futureTrips: places.filter((place) => new Date(place.date) > now),
      pastTrips: places.filter((place) => new Date(place.date) <= now),
    };
  };

  // Actualiza los estados de los viajes cuando cambian los lugares
  useEffect(() => {
    const { futureTrips, pastTrips } = categorizeTrips(places);
    setUpcomingTrips(futureTrips);
    setTripsMade(pastTrips);
  }, [places]);

  // Guarda los lugares en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(places));
  }, [places]);

  const addPlace = (newPlace) => {
    const updatedPlaces = [...places, newPlace];
    setPlaces(updatedPlaces);
  };

  // Limpia los estados (usado para logout)
  const clearTrips = () => {
    setPlaces([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ReservePlacesContext.Provider
      value={{
        places,
        upcomingTrips,
        tripsMade,
        addPlace,
        clearTrips, // Exportar la función para usar en el logout
      }}
    >
      {children}
    </ReservePlacesContext.Provider>
  );
};
