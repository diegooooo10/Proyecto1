import { useEffect, useState } from "react";
import { ReservePlacesContext } from "./ReservePlacesContext";
import { db } from "../../private/services/firebase";
import { collection, getDocs, addDoc, doc } from "firebase/firestore";
import { userId } from "../../private/services/api";

export const ReservePlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [tripsMade, setTripsMade] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);


  useEffect(() => {
    // Establece el usuario cuando se monta el componente
    const loggedInUser = userId();
    setCurrentUser(loggedInUser);
  }, []);

  useEffect(() => {
    if (currentUser) {
      // Cargar los viajes si el usuario está autenticado
      loadUserTrips();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]); // Este efecto depende de `currentUser`

  // Define las referencias de las colecciones de Firestore
  const userRef = currentUser ? doc(db, "users", userId()) : null;
  const futureTripsRef = userRef ? collection(userRef, "futureTrips") : null;
  const pastTripsRef = userRef ? collection(userRef, "pastTrips") : null;

  // Categoriza los viajes como futuros o pasados
  const categorizeTrips = (places) => {
    const now = new Date();
    return {
      futureTrips: places.filter((place) => new Date(place.date) > now),
      pastTrips: places.filter((place) => new Date(place.date) <= now),
    };
  };

  // Cargar los viajes del usuario desde Firestore
  const loadUserTrips = async () => {
    if (!currentUser) return; // Sal si no hay usuario
  
    try {
      const [pastTripsSnapshot, futureTripsSnapshot] = await Promise.all([
        getDocs(pastTripsRef),
        getDocs(futureTripsRef),
      ]);
  
      const pastTrips = pastTripsSnapshot.docs.map((doc) => doc.data());
      const futureTrips = futureTripsSnapshot.docs.map((doc) => doc.data());
  
      setPlaces([...pastTrips, ...futureTrips]);
  
      const { futureTrips: categorizedFutureTrips, pastTrips: categorizedPastTrips } = categorizeTrips([
        ...pastTrips,
        ...futureTrips,
      ]);
  
      setUpcomingTrips(categorizedFutureTrips);
      setTripsMade(categorizedPastTrips);
    } catch (error) {
      console.error("Error al cargar los viajes:", error);
    }
  };
  
  // Guardar los viajes en Firestore
  const addPlace = async (newPlace) => {
    if (!currentUser) return;

    const newPlaceDate = new Date(newPlace.date); // Convierte la fecha del viaje a un objeto Date

    try {
      // Verifica si el viaje es futuro o pasado
      if (newPlaceDate > new Date()) {
        // Si el viaje es futuro, guárdalo en futureTrips
        await addDoc(futureTripsRef, newPlace);
      } else {
        // Si el viaje es pasado, guárdalo en pastTrips
        await addDoc(pastTripsRef, newPlace);
      }

      // Actualiza el estado local
      setPlaces((prevPlaces) => [...prevPlaces, newPlace]);

      // Categoriza los viajes después de agregar uno nuevo
      const {
        futureTrips: categorizedFutureTrips,
        pastTrips: categorizedPastTrips,
      } = categorizeTrips([...places, newPlace]);

      setUpcomingTrips(categorizedFutureTrips);
      setTripsMade(categorizedPastTrips);
    } catch (error) {
      console.error("Error al agregar el lugar:", error);
    }
  };


  return (
    <ReservePlacesContext.Provider
      value={{
        places,
        upcomingTrips,
        tripsMade,
        addPlace,
        setPlaces,
        setUpcomingTrips,
        setTripsMade,
  
      }}
    >
      {children}
    </ReservePlacesContext.Provider>
  );
};
