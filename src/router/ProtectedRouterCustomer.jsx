import { Navigate } from 'react-router-dom';

export const ProtectedRouterCustomer = ({ isAuthenticatedCustomer, children }) => {
    return isAuthenticatedCustomer ? children : <Navigate to="/" />;
};