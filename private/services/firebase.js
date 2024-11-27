import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: `${import.meta.env.VITE_PROJECT_ID}.firebaseapp.com`,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: `${import.meta.env.VITE_PROJECT_ID}.appspot.com`,
};

// Inicialización de Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Exportar instancias de servicios Firebase
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);
export const storage = getStorage(firebaseApp);

// Configuración de persistencia para autenticación
setPersistence(auth, browserLocalPersistence)
  .then(() => console.log("Persistencia de sesión configurada"))
  .catch((error) => console.error("Error configurando persistencia:", error));
