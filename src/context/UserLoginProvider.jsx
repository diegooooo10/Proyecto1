import { useContext, useEffect, useState } from "react";
import { UserLoginContext } from "./UserLoginContext";
import { auth, db } from "../../private/services/firebase"; // Asegúrate de importar db correctamente
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Importa las funciones de Firestore necesarias

export const UserLoginProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe;
  }, []);

  const initializeUser = async (user) => {
    if (user) {
      // Establecer datos básicos del usuario (como uid y email)
      setCurrentUser({ ...user });

      // Obtener los datos adicionales del perfil desde Firestore
      const userDocRef = doc(db, "users", user.uid); // Suponiendo que tienes una colección 'users' en Firestore
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Si el documento existe, agregamos los datos del perfil
        setCurrentUser((prevUser) => ({
          ...prevUser,
          ...userDoc.data(), // Esto agrega los datos adicionales del perfil, como nombre, teléfono, etc.
        }));
      } else {
        console.log("No se encontraron datos adicionales del usuario.");
      }

      setIsAuthenticated(true);
    } else {
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
    setLoading(false);
  };



  const value = {
    currentUser,
    isAuthenticated,
    loading,
    setIsAuthenticated,
    setCurrentUser
  };

  return (
    <UserLoginContext.Provider value={value}>
      {!loading && children}
    </UserLoginContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(UserLoginContext);
};
