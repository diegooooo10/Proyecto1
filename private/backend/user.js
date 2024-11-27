import { doc, getDoc } from "firebase/firestore";

export const fetchUserProfile = async (userId) => {
  const db = '';

  try {
    const userDoc = await getDoc(doc(db, "users", userId));
    if (userDoc.exists()) {
      console.log("Datos del perfil:", userDoc.data());
      return userDoc.data();
    } else {
      console.log("No se encontró el usuario.");
    }
  } catch (error) {
    console.error("Error al obtener datos del perfil:", error);
  }
};
