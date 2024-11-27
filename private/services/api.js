import {
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebase";

// Función para crear un nuevo usuario
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Función para iniciar sesión
export const doSignInWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
export const doSignOut = () => {
  return signOut(auth);
};

// Función para restablecer contraseña
export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Función para enviar correo de verificación
export const doSendEmailVerification = () => {
  return sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  });
};
