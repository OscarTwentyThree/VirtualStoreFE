import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { types } from "../types/types";
import { login } from "../services/auth";
import { ErrorAlert } from "../components/alerts/Error";
import { Navbar } from "../components/navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwalAlert } from "../components/alerts/SwalAlert";

export const Login = () => {
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const [formValues, handleInputChange, reset] = useForm({
    email: "",
    password: "",
  });

  const {dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const { email, password } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, data, token, msg } = await login(email, password);
    if (!error) {
      if (data.roles[0].id == 2) {
        dispatch({
          type: types.loginCustomer,
          payload: { data, token},
        });
        navigate("/customer");
      } else {
        dispatch({
          type: types.loginAdmin,
          payload: { data, token},
        });
        navigate("/admin");
      }
    } else {
      SwalAlert("error", "Usuario o contraseña incorrectos, vuelva a intentarlo");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 ">
        <div className="row rounded">
          <div className="d-flex flex-row-reverse">
            <button className="btn" style={{backgroundColor:"#3aacb0", color:"white"}} onClick={() => navigate("/")}>
              Inicio
            </button>
          </div>
          <div className="col"></div>

          <div className="col mt-5 bg-light rounded shadow">
            <h2 className="fw-bold text-center">Inicio de sesión</h2>
            <div className="">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    placeholder="******"
                    value={password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <input
                  style={{backgroundColor:"#3aacb0", color:"white"}} className="btn "
                    type="submit"
                    value="Iniciar Sesión"
                  />
                </div>
                <div className="mt-4">
                  {error ? <ErrorAlert text={message} /> : null}
                </div>
              </form>
            </div>
          </div>

          <div className="col"></div>
        </div>
      </div>
    </div>
  );
};
