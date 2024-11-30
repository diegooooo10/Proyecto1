import { useState } from "react";
import { Close, Eye, EyeOff, Mail, PadLockPass } from "../svg";
import { Modal } from "./ModalPass";
import { getAuth, updatePassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../private/services/firebase";

export function PasswordResetModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("email");
  const [error, setError] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [succesMessage, setSuccessMessage] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    // Validar el email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setError("The email is not valid.");
    }

    try {
      const userDocRef = doc(db, "users", email); // Consulta en Firestore donde los usuarios están almacenados

      // Verificar si el usuario existe en Firestore
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        setError("This email is not registered.");
        return;
      }

      // Si el correo existe en la base de datos, permitir ingresar la nueva contraseña
      setStep("password");
      setError(""); // Limpiar cualquier error previo
    } catch (err) {
      setError("Error checking email. Please try again.", err);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validar si las contraseñas coinciden
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      const auth = getAuth();
      const user = auth.currentUser; // Obtener el usuario autenticado actual

      if (!user) {
        setError("No user is authenticated.");
        return;
      }

      // Actualizar la contraseña en Firebase Authentication
      await updatePassword(user, newPassword);
      setStep("success");
      setSuccessMessage("Your password has been updated successfully.");
      setError(""); // Limpiar errores
    } catch (err) {
      setError("Error changing password. Please try again.", err);
    }
  };

  const handleClose = () => {
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setStep("email");
    setError("");
    setSuccessMessage("");
    onClose();
  };

  const renderEmailStep = () => (
    <>
      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
        <Mail className="w-6 h-6 " />
      </div>

      <h2 className="mt-4 text-2xl font-semibold text-center text-gray-900 dark:text-gray-50">
        Reset Password
      </h2>

      <p className="mt-2 text-sm text-center text-gray-600 dark:text-white">
        Enter your email to change your password
      </p>

      <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block mb-5 text-sm font-medium text-gray-700 dark:text-white"
          >
            Email Address
          </label>
          {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-common"
            placeholder="Enter your email"
          />
        </div>

        <button className="button-common">Continue</button>
      </form>
    </>
  );

  const renderPasswordStep = () => (
    <>
      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
        <PadLockPass className="w-6 h-6" />
      </div>

      <h2 className="mt-4 text-2xl font-semibold text-center text-gray-900 dark:text-gray-50">
        Create New Password
      </h2>

      <form onSubmit={handlePasswordSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="newPassword"
            className="block mb-5 text-sm font-medium text-gray-700 dark:text-white"
          >
            New Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input-common"
              minLength={8}
              placeholder="Enter your new password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[8px] text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block mb-5 text-sm font-medium text-gray-700 dark:text-white"
          >
            Confirm Password
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-common"
            placeholder="Confirm new password"
            minLength={8}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <div className="flex justify-center gap-3">
          <button
            type="button"
            onClick={() => setStep("email")}
            className="w-auto h-auto px-4 py-2 font-medium text-black transition-colors bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Back
          </button>
          <button
            type="submit"
            className="w-auto h-auto px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-blue-800"
          >
            Change Password
          </button>
        </div>
      </form>
    </>
  );

  const renderSuccessStep = () => (
    <div className="py-4 text-center">
      <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
        <PadLockPass className="w-6 h-6 " />
      </div>

      <h2 className="mt-4 mb-5 text-xl font-semibold text-gray-900 dark:text-white">
        Password Changed Successfully
      </h2>

      <p className="mt-2 mb-5 text-sm text-gray-600 dark:text-white">
        Your password has been updated successfully. You can now log in with
        your new password.
      </p>

      <button onClick={handleClose} className="button-common">
        Close
      </button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="relative">
        <button
          onClick={handleClose}
          className="absolute top-0 right-0 p-1 text-gray-400 hover:text-gray-600"
        >
          <Close size={20} />
        </button>

        {step === "email" && renderEmailStep()}
        {step === "password" && renderPasswordStep()}
        {step === "success" && renderSuccessStep()}
      </div>
    </Modal>
  );
}
