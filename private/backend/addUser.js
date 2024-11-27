import { doc, setDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const registerUser = async (email, password, name, phone, photo) => {
  const auth = getAuth();
  const db = '';

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    const photoUrl = await uploadPhotoToStorage(photo, userId); 

    await setDoc(doc(db, "users", userId), {
      profile: {
        name,
        photoUrl,
        
      },
      trips: {
        past: [],
        upcoming: [],
      },
    });

    console.log("Usuario registrado y datos guardados.");
  } catch (error) {
    console.error("Error al registrar usuario:", error);
  }
};
