import { useEffect, useState } from "react";
import { Close, Eye, EyeOff } from "../svg";

export const ModalDeleteAccount = ({ onClose, deleteAccount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [error, setError] = useState(""); // Estado para manejar errores
  const [showPassword, setShowPassword] = useState(false);

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

  const handleDeleteAccount = async () => {
    if (!password) {
      setError("Password is required.");
      return;
    }

    try {
      // Llama a la función de eliminación, pasando la contraseña
      await deleteAccount(password);
      setError(""); // Limpia el error si la eliminación es exitosa
      closeModal(); // Cierra el modal
    } catch (error) {
      setError("Incorrect password. Please try again.", error);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 select-none transition-opacity duration-500 ${
        isOpen ? "opacity-100" : "opacity-0"
      } ${isOpen || isClosing ? "pointer-events-auto" : "pointer-events-none"}`}
    >
      <div
        className={`relative p-3 space-y-3 text-center flex-col w-11/12 h-auto transform bg-white text-black dark:text-white dark:bg-slate-800 rounded-lg shadow-lg md:w-1/2 lg:w-1/3 transition-all duration-500 ${
          isOpen ? "translate-y-0" : "translate-y-5"
        } ${isClosing ? "translate-y-5 opacity-0" : ""}`}
      >
        <button
          onClick={closeModal}
          className="absolute p-2 text-white top-3 right-2"
        >
          <Close />
        </button>
        <h2 className="text-red-600">Delete Account</h2>
        <div className="flex flex-col space-y-3">
          <label htmlFor="confirmPass">
            <span>Enter your password to confirm deletion.</span>
            {error && <p className="my-4 text-sm text-red-500">{error}</p>}{" "}
            {/* Muestra el mensaje de error */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPass"
                className="mt-5 mb-1 input-common"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Actualiza el estado con la contraseña
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[25px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </label>
        </div>
        <button
          className="w-auto px-10 py-2 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};
