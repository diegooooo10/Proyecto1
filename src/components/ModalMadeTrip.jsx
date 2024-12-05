import { Check, Close, PadLock } from "../svg";
import { useEffect, useState, useContext } from "react";
import { ReservePlacesContext } from "../context/ReservePlacesContext";

export const ModalMadeTrip = ({ place, onClose }) => {
  const { addPlace } = useContext(ReservePlacesContext);
  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInDate, setCheckInDate] = useState("");

  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar la animación
  const [isClosing, setIsClosing] = useState(false); // Estado para controlar el cierre animado

  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    setIsOpen(true); // Modal abierto al montar el componente

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  const closeModal = () => {
    setIsClosing(true); // Iniciar animación de cierre
    setTimeout(() => {
      setIsOpen(false); // Después de la animación, cerrar el modal
      onClose(); // Llamar a la función `onClose` para manejar el desmontaje externo
    }, 500); // 500ms para que coincida con la duración de la animación
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!checkInDate || !checkOutDate) {
      setError("Please fill in both check-in and check-out dates.");
      return;
    }
  
    const today = new Date(); // Objeto Date para la fecha de hoy
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
  
    if (checkIn > today) {
      setError("Check-in date must not be in the future.");
      return;
    }
  
    if (checkOut <= checkIn) {
      setError("Check-out date must be after check-in date.");
      return;
    }
  
    if (checkOut > today) {
      setError("Check-out date must not be in the future.");
      return;
    }
  
    const newPlace = {
      id: Date.now(),
      title: place.title,
      date: checkInDate,
      img: place.img,
      price: place.price,
      description: place.description,
    };
  
    addPlace(newPlace);
    setError(""); // Limpiar errores
    closeModal();
  };
  

  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 select-none transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0"
      } ${isOpen || isClosing ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        className={`relative flex-col w-11/12 h-auto transform bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3 transition-all duration-500 ${
          isOpen ? "translate-y-0" : "translate-y-5"
        } ${isClosing ? "translate-y-5 opacity-0" : ""}`}
      >
        <div className="flex items-center w-full p-4 space-x-4 rounded-t-lg bg-gradient-to-r from-blue-600 to-blue-700 h-1/6">
          <Check />
          <div className="flex flex-col">
            <h2 className="font-semibold text-white">
              Add the place youve already been to
            </h2>
            <p className="text-sm text-blue-100 font-extralight">
              {place.title}
            </p>
          </div>
          <button
            onClick={closeModal}
            className="absolute p-2 text-white top-3 right-2"
          >
            <Close />
          </button>
        </div>
        <form
          autoComplete="none"
          onSubmit={handleSubmit}
          className="w-full h-auto p-6 space-y-4 bg-white rounded-b-lg"
        >
          <h2 className="text-lg font-semibold text-gray-800">Travel Date</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label htmlFor="indate" className="label">
                Check-in Date
              </label>
              <input
                type="date"
                name="indate"
                id="indate"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                className="inputField"
                max={new Date().toISOString().split("T")[0]} // Restringe a la fecha de hoy
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="outdate" className="label">
                Check-out Date
              </label>
              <input
                type="date"
                name="outdate"
                id="outdate"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                className="inputField"
                max={new Date().toISOString().split("T")[0]} // Restringe a la fecha de hoy
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex items-center justify-center w-full buttonPrimary"
            >
              <PadLock />
              <span className="ml-2">Pay Securely Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
