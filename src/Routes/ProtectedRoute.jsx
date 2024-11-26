import { Navigate } from 'react-router-dom';
import { UserLoginContext } from '../context/UserLoginContext';
import { useContext } from 'react';

export const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useContext(UserLoginContext);

    return isAuthenticated ? children : <Navigate to="/login" />;
};
export const UserLoged = ({children}) => {
    const { isAuthenticated } = useContext(UserLoginContext);
    return isAuthenticated ? <Navigate to="/account" /> : children;
};