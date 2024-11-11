import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const PublicRouter = ({ isAuthenticatedAdmin,isAuthenticatedCustomer, children }) => {
  const { data } = useContext(AuthContext);
  if (!data.isAuthenticatedCustomer && !data.isAuthenticatedAdmin) {
    return !isAuthenticatedAdmin ? children : <Navigate to="/admin" />;
  } else {
    if (data.isAuthenticatedCustomer) {
      return !isAuthenticatedCustomer ? children : <Navigate to="/customer" />;
    } else if (data.isAuthenticatedAdmin) {
      return !isAuthenticatedAdmin ? children : <Navigate to="/admin" />;
    }
  }
};
