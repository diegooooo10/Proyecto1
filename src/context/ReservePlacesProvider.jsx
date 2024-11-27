import { useEffect, useState } from "react";
import { ReservePlacesContext } from "./ReservePlacesContext";
import { db, auth } from "../../private/services/firebase"; // Asegúrate de tener las configuraciones de Firebase aquí
import { collection, getDocs, addDoc, doc } from "firebase/firestore";


export const ReservePlacesProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);
  const [upcomingTrips, setUpcomingTrips] = useState([]);
  const [tripsMade, setTripsMade] = useState([]);

  const user = auth.currentUser; // Obtener el usuario actual

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
    if (user) {
      const userRef = doc(db, "users", user.uid);
      const pastTripsRef = collection(userRef, "pastTrips");
      const futureTripsRef = collection(userRef, "futureTrips");

      // Obtener los viajes pasados y futuros
      const pastTripsSnapshot = await getDocs(pastTripsRef);
      const futureTripsSnapshot = await getDocs(futureTripsRef);

      const pastTrips = pastTripsSnapshot.docs.map((doc) => doc.data());
      const futureTrips = futureTripsSnapshot.docs.map((doc) => doc.data());

      // Combina los viajes futuros y pasados
      setPlaces([...pastTrips, ...futureTrips]);

      // Categoriza los viajes
      const { futureTrips: categorizedFutureTrips, pastTrips: categorizedPastTrips } = categorizeTrips([
        ...pastTrips,
        ...futureTrips,
      ]);

      setUpcomingTrips(categorizedFutureTrips);
      setTripsMade(categorizedPastTrips);
    }
  };

  // Cargar los viajes cada vez que el usuario inicie sesión o cambie
  useEffect(() => {
    loadUserTrips();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Guardar los viajes en Firestore
// Guardar los viajes en Firestore
const addPlace = async (newPlace) => {
  if (user) {
    const userRef = doc(db, "users", user.uid);
    const futureTripsRef = collection(userRef, "futureTrips");
    const pastTripsRef = collection(userRef, "pastTrips");

    const newPlaceDate = new Date(newPlace.date); // Convierte la fecha del viaje a un objeto Date

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
    const { futureTrips: categorizedFutureTrips, pastTrips: categorizedPastTrips } = categorizeTrips([
      ...places,
      newPlace,
    ]);

    setUpcomingTrips(categorizedFutureTrips);
    setTripsMade(categorizedPastTrips);
  }
};


  // Limpia los viajes (cuando el usuario cierre sesión)
  const clearTrips = () => {
    setPlaces([]);
    setUpcomingTrips([]);
    setTripsMade([]);
  };

  return (
    <ReservePlacesContext.Provider
      value={{
        places,
        upcomingTrips,
        tripsMade,
        addPlace,
        clearTrips,
      }}
    >
      {children}
    </ReservePlacesContext.Provider>
  );
};
