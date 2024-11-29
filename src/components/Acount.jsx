import { useContext, useEffect } from "react";
import { ArrowReturn, Dark, User } from "../svg";
import { DarkModeContext } from "../context/DarkModeContext";
import { Link } from "react-router-dom";
import { ReservePlacesContext } from "../context/ReservePlacesContext";
import { UserProfileContext } from "../context/ProfileContext"; // Importa el contexto de perfil de usuario
import {
  collection,
/*   deleteDoc,
 */  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../../private/services/firebase"; // Asegúrate de importar db correctamente
import { useAuth } from "../context/UserLoginProvider";
import { user, userId } from "../../private/services/api";

export const Acount = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const {
    upcomingTrips,
    tripsMade,
    setPlaces,
    setUpcomingTrips,
    setTripsMade,
  } = useContext(ReservePlacesContext);
  const { profileImage, setProfileImage } = useContext(UserProfileContext);

  const { currentUser, isAuthenticated, setIsAuthenticated, setCurrentUser } =
    useAuth();

  const logOut = () => {
    auth.signOut();
    setIsAuthenticated(false);
    setCurrentUser(null);
    setProfileImage(null);
    setPlaces([]), setUpcomingTrips([]), setTripsMade([]);
  };
  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    logOut();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user()) {
        try {
          const userRef = doc(db, "users", userId());
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            // Actualiza la imagen de perfil
            setProfileImage(userData.profilePicture || null);

            // Carga los viajes desde Firestore
            const futureTripsRef = collection(userRef, "futureTrips");
            const pastTripsRef = collection(userRef, "pastTrips");

            const [futureTripsSnapshot, pastTripsSnapshot] = await Promise.all([
              getDocs(futureTripsRef),
              getDocs(pastTripsRef),
            ]);

            const futureTrips = futureTripsSnapshot.docs.map((doc) =>
              doc.data()
            );
            const pastTrips = pastTripsSnapshot.docs.map((doc) => doc.data());

            // Actualiza los estados de viajes
            setUpcomingTrips(futureTrips);
            setTripsMade(pastTrips);
          }
        } catch (error) {
          console.error("Error loading profile or trips:", error);
        }
      }
    };

    fetchUserProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]); // Este efecto se ejecuta cada vez que cambie el usuario

  const imageProfileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const imageUrl = event.target.result;

        // Actualizar el estado con la URL de la imagen
        setProfileImage(imageUrl);

        // Actualizar la imagen en Firestore
        if (user()) {
          const userRef = doc(db, "users", userId());
          await updateDoc(userRef, {
            profilePicture: imageUrl, // Guardar la URL de la imagen en Firestore
          });
        }
      };
      reader.readAsDataURL(file); // Leer el archivo como URL base64
    }
  };
  if (!isAuthenticated) {
    return <div>Please log in to view your profile.</div>;
  }
/*   const handleDeleteAccount = async (e) => {
    e.preventDefault();
  
    if (!auth.currentUser) {
      console.error("No hay un usuario autenticado.");
      return;
    }
  
    try {
      // Eliminar el documento del usuario en Firestore
      const userRef = doc(db, "users", auth.currentUser.uid);
      await deleteDoc(userRef);
  
      // Eliminar la cuenta del usuario de Firebase Authentication
      await auth.currentUser.delete();
  
      console.log("La cuenta ha sido eliminada exitosamente.");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
    }
  }; */

  return (
    <div className="min-h-screen p-4 space-y-6 bg-white dark:bg-slate-800">
      <Link to="/" className="absolute left-5 lg:top-10 top-5 lg:left-10">
        <ArrowReturn />
      </Link>
      <button
        onClick={handleToggle}
        className="absolute -top-1 lg:top-4 right-5 lg:right-10"
      >
        <Dark />
      </button>
      <h2 className="mb-5 text-center text-black dark:text-white">Account</h2>

      <header className="profileHeader">
        <div className="mb-4">
          {profileImage ? (
            <img
              src={profileImage} // Mostrar la imagen seleccionada
              alt="Profile"
              className="object-cover w-32 h-32 rounded-full"
            />
          ) : (
            <User className="w-32 h-32 text-gray-500 dark:text-gray-300" /> // Mostrar el componente SVG por defecto
          )}
        </div>
        <label htmlFor="profile" className="profileButton">
          Select an image
        </label>
        <input
          type="file"
          accept="image/png,image/jpeg"
          name="profile"
          id="profile"
          onChange={imageProfileChange} // Llama a la función cuando se selecciona un archivo
          className="hidden"
        />
        <p className="m-3 text-lg font-medium text-black dark:text-white">
          {currentUser?.name}
        </p>
        <div className="space-x-5">

        <button
          onClick={handleLogout}
          className="inline-block px-4 py-2 text-sm font-medium text-white transition bg-red-600 rounded-md cursor-pointer hover:bg-red-500"
        >
          Logout
        </button>
{/*         <button
          onClick={handleDeleteAccount}
          className="inline-block px-4 py-2 text-sm font-medium text-white transition rounded-md cursor-pointer"
        >
          Delete Account
        </button> */}
        </div>
      </header>

      <article>
        <h2 className="sectionTitle">Trips made</h2>
        {tripsMade.length === 0 ? (
          <p className="w-full text-xl text-center text-black dark:text-white">
            {`You haven't booked any trips yet`}
          </p>
        ) : (
          <div className="flex flex-row w-full h-64 gap-4 overflow-x-scroll custom-scroll">
            {tripsMade.map((lugar, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="cardTrending2"
                  style={{ backgroundImage: `url(${lugar.img})` }}
                >
                  <div
                    className={isEven ? "cardContentEven" : "cardContentOdd"}
                  >
                    <p className="text-lg font-semibold">{lugar.title}</p>
                    <p className="text-sm">{lugar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </article>

      <article>
        <h2 className="sectionTitle">Upcoming trips</h2>
        {upcomingTrips.length === 0 ? (
          <p className="w-full text-xl text-center text-black dark:text-white">
            {`You don't have any upcoming trips`}
          </p>
        ) : (
          <div className="flex flex-row w-full h-64 gap-4 overflow-x-scroll custom-scroll">
            {upcomingTrips.map((lugar, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={index}
                  className="cardTrending2"
                  style={{ backgroundImage: `url(${lugar.img})` }}
                >
                  <div
                    className={isEven ? "cardContentEven" : "cardContentOdd"}
                  >
                    <p className="text-lg font-semibold">{lugar.title}</p>
                    <p className="text-sm">{lugar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </article>
    </div>
  );
};
