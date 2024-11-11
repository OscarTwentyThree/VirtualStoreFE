import { Navigate } from 'react-router-dom';

export const ProtectedRouterAdmin = ({ isAuthenticatedAdmin, children }) => {
    return isAuthenticatedAdmin ? children : <Navigate to="/" />;
};