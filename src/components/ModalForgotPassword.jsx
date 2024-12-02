import { useState } from "react";
import { Close, Mail, PadLockPass } from "../svg";
import { Modal } from "./ModalPass";
import { auth } from "../../private/services/firebase";
import { sendPasswordResetEmail } from "firebase/auth";

export function PasswordResetModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");

  const [step, setStep] = useState("email");
  const [error, setError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  
  // eslint-disable-next-line no-unused-vars
  const [succesMessage, setSuccessMessage] = useState("");

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (isSubmit) return;
    setIsSubmit(true);
  
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("The email is not valid.");
      setIsSubmit(false);
      return;
    }
  
    try {
      await sendPasswordResetEmail(auth, email);
      setStep("success");
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsSubmit(false);
    }
  };

  const handleClose = () => {
    setEmail("");
    setStep("email");
    setError("");
    setSuccessMessage("");
    onClose();
    setIsSubmit(false)
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
            className="block text-sm font-medium text-gray-700 dark:text-white"
          >
            Email Address
          </label>
          {error && <p className="my-3 text-sm text-red-600">{error}</p>}
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-common"
            placeholder="Enter your email"
          />
        </div>

        <button className="button-common"  disabled={isSubmit}>Continue</button>
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
          Weve sent a password reset link to your email. Check your inbox.
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
        {step === "success" && renderSuccessStep()}
      </div>
    </Modal>
  );
}
