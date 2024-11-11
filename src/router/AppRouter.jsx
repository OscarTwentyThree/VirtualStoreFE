import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { PublicRouter } from "./PublicRouter";
import { InitialRouter } from "./InitialRouter";
import { AdminRouter } from "./AdminRouter";
import { ProtectedRouterAdmin } from "./ProtectedRouterAdmin";
import { ProtectedRouterCustomer } from "./ProtectedRouterCustomer";
import { CustomerRouter } from "./CustomerRouter";

export const AppRouter = () => {
  const { data } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <>
              <PublicRouter isAuthenticatedAdmin={data.isAuthenticatedAdmin} isAuthenticatedCustomer={data.isAuthenticatedCustomer}>
                <InitialRouter />
              </PublicRouter>
            </>
          }
        />
        <Route
          path="/admin/*"
          element={
            <>
              <ProtectedRouterAdmin isAuthenticatedAdmin={data.isAuthenticatedAdmin} isAuthenticatedCustomer={data.isAuthenticatedCustomer}>
                <AdminRouter />
              </ProtectedRouterAdmin>
            </>
          }
        />
        <Route
          path="/customer/*"
          element={
            <>
              <ProtectedRouterCustomer isAuthenticatedCustomer={data.isAuthenticatedCustomer} isAuthenticatedAdmin={data.isAuthenticatedAdmin}>
                <CustomerRouter />
              </ProtectedRouterCustomer>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
