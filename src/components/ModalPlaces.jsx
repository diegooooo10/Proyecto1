import { Close, CreditCard, PadLock, Plane } from "../svg";
import { useEffect, useState, useContext } from "react";
import { ReservePlacesContext } from "../context/ReservePlacesContext";

export const ModalPlaces = ({ place, onClose }) => {
  const { addPlace } = useContext(ReservePlacesContext);

  const [checkOutDate, setCheckOutDate] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardholderName, setCardholderName] = useState("");
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

  const formatCardNumber = (value) => {
    return value
      .replace(/\D/g, "") // Solo números
      .replace(/(\d{4})/g, "$1 ") // Agrupa en bloques de 4
      .trim(); // Elimina espacios finales
  };

  const handleCardNumberChange = (e) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validación de fechas
    if (!checkInDate || !checkOutDate) {
      setError("Please fill in both check-in and check-out dates.");
      return;
    }

    if (new Date(checkOutDate) <= new Date(checkInDate)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    // Validación de tarjeta
    const sanitizedCardNumber = cardNumber.replace(/\s+/g, "");
    if (sanitizedCardNumber.length !== 16) {
      setError("Card number must be 16 digits.");
      return;
    }
    if (!expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
      setError("Expiry date format is MM/YY.");
      return;
    }

    if (cvc.length !== 3 && cvc.length !== 4) {
      setError("CVC must be 3 or 4 digits.");
      return;
    }

    if (!cardholderName.trim()) {
      setError("Cardholder name is required.");
      return;
    }

    const newPlace = {
      id: Date.now(), // Genera un ID único
      title: place.title,
      date: checkInDate,
      img: place.img,
      price: place.price, // Precio ejemplo
      description: place.description
    };

    // Agregar el lugar
    addPlace(newPlace);
    
    setError(""); // Limpiar errores si todo es válido
    closeModal(); // Cerrar modal con animación
  };

  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 select-none transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0'} ${isOpen || isClosing ? 'pointer-events-auto' : 'pointer-events-none'}`}
    >
      <div
        className={`relative flex-col w-11/12 h-auto transform bg-white rounded-lg shadow-lg md:w-1/2 lg:w-1/3 transition-all duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-5'} ${isClosing ? 'translate-y-5 opacity-0' : ''}`}
      >
        <div className="flex items-center w-full p-4 space-x-4 rounded-t-lg bg-gradient-to-r from-blue-600 to-blue-700 h-1/6">
          <Plane />
          <div className="flex flex-col">
            <h2 className="font-semibold text-white">Complete Your Booking</h2>
            <p className="text-sm text-blue-100 font-extralight">{place.title}</p>
          </div>
          <button onClick={closeModal} className="absolute p-2 text-white top-3 right-2">
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
              />
            </div>
          </div>

          <div className="flex justify-between p-2 rounded-md bg-blue-50">
            <p className="text-gray-700">Total Amount:</p>
            <p className="text-sm text-blue-700">{place.price}</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <label htmlFor="cardnumber" className="label">Card Number</label>
              <CreditCard />
              <input
                type="text"
                name="cardnumber"
                id="cardnumber"
                value={cardNumber}
                onChange={handleCardNumberChange}
                className="w-full px-3 py-2 pl-10 text-black border border-gray-200 rounded-lg focus:outline-none focus:ring-0 focus:border-blue-500"
                placeholder="1234 5678 9012 3456"
                maxLength={19} // Limitar a 16 dígitos + espacios
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expirydate" className="label">Expiry Date</label>
                <input
                  type="text"
                  name="expirydate"
                  id="expirydate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  className="inputField"
                  placeholder="MM/YY"
                  maxLength={5}
                />
              </div>
              <div>
                <label htmlFor="cvc" className="label">CVC</label>
                <input
                  type="text"
                  name="cvc"
                  id="cvc"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  className="inputField"
                  placeholder="123"
                  maxLength={4}
                />
              </div>
            </div>

            <div>
              <label htmlFor="cardholdername" className="label">Cardholder Name</label>
              <input
                type="text"
                name="cardholdername"
                id="cardholdername"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className="inputField"
                placeholder="Name"
                maxLength={20}
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
            <p className="mt-2 text-xs text-center text-gray-500">
              Your payment is secured with SSL encryption
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
