import { useState } from "react";
import { Close, Eye, EyeOff, Mail, PadLockPass } from "../svg";
import { Modal } from "./ModalPass";

export function PasswordResetModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("email");
  const [error, setError] = useState("");

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Typically, you'd verify that the email exists here
    setStep("password");
    setError("");
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }
    // Typically, you would call an API to update the password here
    setStep("success");
    setError("");
  };

  const handleClose = () => {
    setEmail("");
    setNewPassword("");
    setConfirmPassword("");
    setStep("email");
    setError("");
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
        Enter your email to reset your password
      </p>

      <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block mb-5 text-sm font-medium text-gray-700 dark:text-white"
          >
            Email Address
          </label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-common"
            placeholder="Enter your email"
          />
        </div>

        <button type="submit" className="button-common">
          Continue
        </button>
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

      <p className="mt-2 text-sm text-center text-gray-600 dark:text-white">
        Enter your new password
      </p>

      <form
        autoComplete="none"
        onSubmit={handlePasswordSubmit}
        className="mt-6 space-y-4"
      >
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
            className="w-auto h-auto px-4 py-2 font-medium text-black transition-colors bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button type="submit" className="w-auto h-auto px-4 py-2 font-medium text-white transition-colors bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-blue-800 disabled:opacity-50 disabled:cursor-not-allowed">
            Reset Password
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
        Password Reset Successfully
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
