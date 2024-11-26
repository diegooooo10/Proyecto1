import { Login } from "../components/Login";
import { UserLoged } from "./ProtectedRoute";

export const LoginRoute = () => {
  return (
    <UserLoged>
      <Login />
    </UserLoged>
  );
};
