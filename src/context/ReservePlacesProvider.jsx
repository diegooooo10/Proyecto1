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

  const categorizeTrips = (places) => {
    const now = new Date();
    return {
      futureTrips: places.filter((place) => new Date(place.date) > now),
      pastTrips: places.filter((place) => new Date(place.date) <= now),
    };
  };

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

  return (
    <ReservePlacesContext.Provider
      value={{ places, upcomingTrips, tripsMade, addPlace }}
    >
      {children}
    </ReservePlacesContext.Provider>
  );
};
