import { useEffect, useState } from "react";
import { auth, db } from "../../private/services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserProfileContext } from "./ProfileContext";

export const UserProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfileImage(userData.profilePicture || null);
        }
      }
    };

    fetchUserData();
  }, [user]);

  // Maneja la selección de imagen y la convierte a URL
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageUrl = event.target.result;
        setProfileImage(imageUrl);

        // Actualiza Firestore con la URL de la imagen
        if (user) {
          const userRef = doc(db, "users", user.uid);
          await setDoc(userRef, { profilePicture: imageUrl }, { merge: true });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        profileImage,
        setProfileImage,
        handleImageChange, // Proporciona la función para cambiar la imagen
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
