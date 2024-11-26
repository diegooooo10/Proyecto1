import { Acount } from "../components/Acount";
import { ProtectedRoute } from "./ProtectedRoute";

export const Account = () => {
  return (
    <ProtectedRoute>
      <Acount />
    </ProtectedRoute>
  );
};
