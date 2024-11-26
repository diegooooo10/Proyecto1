import { useState, useContext, useEffect } from "react";
import { ArrowReturn, Dark, User } from "../svg";
import { DarkModeContext } from "../context/DarkModeContext";
import { Link } from "react-router-dom";
import { ReservePlacesContext } from "../context/ReservePlacesContext";
import { UserLoginContext } from "../context/UserLoginContext";

export const Acount = () => {
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const { upcomingTrips, tripsMade } = useContext(ReservePlacesContext);
  const { clearTrips } = useContext(ReservePlacesContext);
  const {logout} = useContext(UserLoginContext)

  const [profileImage, setProfileImage] = useState(null); // Estado para la imagen de perfil

  // Recuperar la imagen desde localStorage cuando el componente se monta
  useEffect(() => {
    const savedProfileImage = localStorage.getItem("profileImage");
    if (savedProfileImage) {
      setProfileImage(savedProfileImage); // Establecer la imagen guardada
    }
  }, []);

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };
  const handleLogout = () => {
    localStorage.removeItem("profileImage");
    logout();
    clearTrips();
  };

  const imageProfileChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setProfileImage(imageUrl); // Establecer la imagen seleccionada
        localStorage.setItem("profileImage", imageUrl); // Guardar la imagen en localStorage
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.log("No image selected");
    }
  };
  

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
              className="object-cover w-32 h-32 mb-4 rounded-full"
            />
          ) : (
            <User className="w-32 h-32 mb-4 text-gray-500 dark:text-gray-300" /> // Mostrar el componente SVG por defecto
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
          onChange={imageProfileChange}
          className="hidden"
        />
        <p className="mt-4 text-lg font-medium text-black dark:text-white">
          User name
        </p>
          <button 
          onClick={handleLogout}
          className="inline-block px-4 py-2 mt-8 text-sm font-medium text-white transition bg-red-600 rounded-md cursor-pointer hover:bg-red-500">
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
          <div className="flex flex-row w-64 h-64 gap-4 overflow-x-scroll custom-scroll">
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
          <p className="w-full text-xl text-center text-black  dark:text-white">
            {`You don't have any upcoming trips`}
          </p>
        ) : (
          <div className="flex flex-row w-64 h-64 gap-4 overflow-x-scroll custom-scroll">
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
