import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";
import { PasswordResetModal } from "./ModalForgotPassword";
import {
  doSignInWithEmailAndPassword,
  doCreateUserWithEmailAndPassword,
  doPasswordReset,
} from "../../private/services/api";
import { ArrowReturn, Dark, Eye, EyeOff } from "../svg";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    passwordConfirm: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const handleToggle = () => setIsDarkMode(!isDarkMode);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const validateInputs = () => {
    if (activeTab === "register") {
      if (!formData.name.trim() || formData.name.length < 3) {
        return "The name must be at least 3 characters.";
      }
      if (
        !formData.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      ) {
        return "The email is not valid.";
      }
      if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) {
        return "The phone number must be valid (10 digits).";
      }
      if (formData.password !== formData.passwordConfirm) {
        return "Passwords do not match.";
      }
    }
    if (
      !formData.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      return "The email is not valid.";
    }
    if (!formData.password || formData.password.length < 6) {
      return "The password must be at least 6 characters.";
    }
    return "";
  };
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
    });
    setError(""); // Limpiar también el error al cambiar de tab
    setShowPassword(false)
  }, [activeTab]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const validationError = validateInputs();

    if (validationError) {
      setError(validationError);
      setIsLoading(false);
      return;
    }

    try {
      if (activeTab === "login") {
        await doSignInWithEmailAndPassword(formData.email, formData.password);
        //alert("Logged in successfully!");
      } else if (activeTab === "register") {
        await doCreateUserWithEmailAndPassword(
          formData.email,
          formData.password,
          formData.name,
          formData.phone
        );
        //alert("Account created successfully!");
        setActiveTab("login");
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    }

    setIsLoading(false);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handlePasswordReset = async (email) => {
    try {
      await doPasswordReset(email);
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message || "Error sending password reset email.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-white dark:bg-slate-800">
      <Link to="/" className="absolute lg:left-10 left-5 top-5 lg:top-10">
        <ArrowReturn />
      </Link>
      <button
        onClick={handleToggle}
        className="absolute right-5 lg:top-10 top-5 lg:right-10"
      >
        <Dark />
      </button>
      <div className="w-full max-w-md p-8 border rounded-lg shadow-xl bg-gray-50 dark:bg-slate-800 dark:border-slate-700">
        <h1 className="mb-8 text-2xl font-bold text-center text-black dark:text-white">
          Login / Register
        </h1>

        <div className="mb-8">
          <div className="flex border-b dark:border-slate-700">
            <button
              className={`tab-button ${
                activeTab === "login" ? "active-tab" : "inactive-tab"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`tab-button ${
                activeTab === "register" ? "active-tab" : "inactive-tab"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="text-sm text-center text-red-500">{error}</div>
          )}
          {activeTab === "register" && (
            <div>
              <label htmlFor="name" className="label-common">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="input-common"
                placeholder="Enter your name"
                value={formData.name}
                maxLength={20}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="label-common">
              Email
            </label>
            <input
              id="email"
              type="text"
              maxLength={50}
              className="input-common"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {activeTab === "register" && (
            <div>
              <label htmlFor="phone" className="label-common">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                maxLength={10}
                className="input-common"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <label htmlFor="password" className="label-common">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                maxLength={20}
                className="input-common"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[8px] text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
          </div>
          {activeTab === "register" && (
            <div>
              <label htmlFor="passwordConfirm" className="label-common">
                Confirm Password
              </label>
              <input
                id="passwordConfirm"
                type={showPassword ? "text" : "password"}
                maxLength={20}
                className="input-common"
                placeholder="Confirm your password"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </div>
          )}
          <button type="submit" disabled={isLoading} className="button-common">
            {isLoading
              ? "Loading..."
              : activeTab === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>

        {activeTab === "login" && (
          <div className="mt-6 text-center">
            <button
              onClick={handleOpenModal}
              className="text-sm text-blue-400 transition-colors hover:text-blue-300"
            >
              Forgot my password
            </button>
          </div>
        )}
      </div>

      {/* Modal for resetting password */}
      <PasswordResetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handlePasswordReset}
      />
    </div>
  );
};
