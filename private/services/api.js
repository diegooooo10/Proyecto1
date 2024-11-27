import { 
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  db,
  doc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  addDoc,
  query,
  where,
} from "./firebase";

const collectionName = "usuarios";

// Crear un usuario en Firestore
export const createUser = async (obj) => {
  try {
    const colRef = collection(db, collectionName);
    const data = await addDoc(colRef, obj);
    return data.id;
  } catch (error) {
    console.error("Error creando usuario:", error);
    throw error;
  }
};

// Actualizar usuario
export const updateUser = async (id, obj) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, obj);
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    throw error;
  }
};

// Obtener todos los usuarios
export const getUser = async () => {
  try {
    const colRef = collection(db, collectionName);
    const result = await getDocs(query(colRef));
    return getArrayFromCollection(result);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    throw error;
  }
};

// Obtener usuario por ID
export const getUserById = async (id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const result = await getDoc(docRef);
    return result.data();
  } catch (error) {
    console.error("Error obteniendo usuario por ID:", error);
    throw error;
  }
};

// Función auxiliar: convertir colección en array
const getArrayFromCollection = (collection) => {
  return collection.docs.map((doc) => {
    return { ...doc.data(), id: doc.id };
  });
};
