import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const user = () => {
  return auth.currentUser; 
}

export const userId = () => {
  const user = auth.currentUser;
  if (user) {
    return user.uid; 
  } else {
    return null; 
  }
}
// Función para crear un nuevo usuario
export const doCreateUserWithEmailAndPassword = async (email, password, name, phone) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Guardar los datos adicionales del usuario en Firestore
  await setDoc(doc(db, "users", user.uid), {
    name,
    phone,
    email: user.email, // Guardamos también el email
  });

  return userCredential;
};
// Función para iniciar sesión
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Función para restablecer contraseña
export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};


