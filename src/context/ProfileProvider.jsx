/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { db } from "../../private/services/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { UserProfileContext } from "./ProfileContext";
import { user, userId } from "../../private/services/api";
export const UserProfileProvider = ({ children }) => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user()) {
        const userRef = doc(db, "users", userId());
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfileImage(userData.profilePicture || null);
        }
      }
    };

    fetchUserData();
  }, [user()]);

  const handleImageChange = (e) => {
    const file = e.target.files[userId()];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageUrl = event.target.result;
        setProfileImage(imageUrl);

        // Actualiza Firestore con la URL de la imagen
        if (user()) {
          const userRef = doc(db, "users", userId());
          await setDoc(userRef, { profilePicture: imageUrl });
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
        handleImageChange,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};
