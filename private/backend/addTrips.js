import { doc, updateDoc, arrayUnion } from "firebase/firestore";

export const addTrip = async (userId, destination, date) => {
  const db = '';
  const tripType = new Date(date) > new Date() ? "upcoming" : "past";

  try {
    const userDoc = doc(db, "users", userId);
    await updateDoc(userDoc, {
      [`trips.${tripType}`]: arrayUnion({ destination, date }),
    });

    console.log("Viaje agregado correctamente.");
  } catch (error) {
    console.error("Error al agregar viaje:", error);
  }
};
