import { useContext, useState } from "react";
import { ArrowReturn, Dark } from "../svg";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../context/DarkModeContext";

export const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Aquí iría la lógica para manejar el envío del formulario, ya sea para login o registro
    setIsLoading(false);
  };


  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
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
          {activeTab === "register" && (
            <div>
              <label htmlFor="name" className="label-common">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleInputChange}
                className="input-common"
                placeholder="Enter your name"
              />
            </div>
          )}
          <div>
            <label htmlFor="email" className="label-common">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-common"
              placeholder="Enter your email"
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
                value={formData.phone}
                onChange={handleInputChange}
                className="input-common"
                placeholder="Enter your phone number"
              />
            </div>
          )}
          <div>
            <label htmlFor="password" className="label-common">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input-common"
              placeholder="Enter your password"
            />
          </div>
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
            <Link
            to='/account'

              className="text-sm text-blue-400 transition-colors hover:text-blue-300"
            >
              Forgot my password
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
