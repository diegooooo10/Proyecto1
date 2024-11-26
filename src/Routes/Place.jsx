import { Places } from "../components/Places";
import {ProtectedRoute} from '../Routes/ProtectedRoute'
export const Place = () => {
  return (
    <ProtectedRoute>
      <Places/>
    </ProtectedRoute>
  );
};
