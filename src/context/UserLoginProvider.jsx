import { useState } from "react";
import { UserLoginContext } from "./UserLoginContext";

export const UserLoginProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('loggedIn') === 'true'
);

const login = (email, password) => {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  if (storedUser?.email === email && storedUser?.password === password) {
      localStorage.setItem('loggedIn', 'true');
      setIsAuthenticated(true);
      return true;
  }
  return false;
};
const register = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
  
};

  const logout = () => {
    localStorage.removeItem("loggedIn");
    setIsAuthenticated(false);
  };
  return (
    <UserLoginContext.Provider value={{ isAuthenticated, login,register ,logout }}>
      {children}
    </UserLoginContext.Provider>
  );
};
