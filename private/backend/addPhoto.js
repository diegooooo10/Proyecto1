import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const uploadPhotoToStorage = async (file, userId) => {
  const storage = '';
  const storageRef = ref(storage, `profilePictures/${userId}.jpg`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const photoUrl = await getDownloadURL(snapshot.ref);
    return photoUrl;
  } catch (error) {
    console.error("Error al subir foto:", error);
  }
};
