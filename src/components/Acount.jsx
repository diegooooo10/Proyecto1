import { useContext, useEffect } from "react";
import { ArrowReturn, Dark, User } from "../svg";
import { DarkModeContext } from "../context/DarkModeContext";
import { Link } from "react-router-dom";
import { ReservePlacesContext } from "../context/ReservePlacesContext";
import { UserLoginContext } from "../context/UserLoginContext";
import { UserProfileContext } from "../context/ProfileContext"; // Importa el contexto de perfil de usuario
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../private/services/firebase";
import { useAuth } from "../context/UserLoginProvider";
import { user, userId } from "../../private/services/api";

export const Acount = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const { upcomingTrips, tripsMade } = useContext(ReservePlacesContext);
  const { logOut } = useContext(UserLoginContext);
  const { profileImage, setProfileImage } = useContext(UserProfileContext); // Usa el contexto para el perfil de usuario

  const { currentUser, isAuthenticated } = useAuth();

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    logOut();
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user()) {
        const userRef = doc(db, "users", userId());
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setProfileImage(userData.profilePicture || null); // Actualizar el estado con la URL de la imagen
        }
      }
    };

    fetchUserProfile();
  }, [user(), setProfileImage]); // Esto se ejecuta solo cuando el usuario cambia

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
        <button
          onClick={handleLogout}
          className="inline-block px-4 py-2 text-sm font-medium text-white transition bg-red-600 rounded-md cursor-pointer hover:bg-red-500"
        >
          Logout
        </button>
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
