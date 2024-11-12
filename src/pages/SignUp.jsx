import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { types } from "../types/types";
import { signUp } from "../services/auth";
import { ErrorAlert } from "../components/alerts/Error";
import { Navbar } from "../components/navbar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwalAlert,SwalAlertPass} from "../components/alerts/SwalAlert";
import { validPassword } from "../services/regex";



//id, password,firstName, lastName,email,phoneNumber
export const SignUp = () => {
    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");
    const [formValues, handleInputChange, reset] = useForm({
        id: "",
        password: "",
        passwordConfirm: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: 0
        
    });

    const { dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const { id, password,firstName, lastName,email,phoneNumber,passwordConfirm } = formValues;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password != passwordConfirm) {
      SwalAlert("error", "Las contraseñas no coinciden");
      return;
    }

    if(!validPassword.test(password) && !validPassword.test(passwordConfirm)){
      SwalAlertPass("error", "Contraseña no cumple con los requisitos, debe contener al menos una letra mayúscula, una minúscula, un número y un caracter especial y tener una longitud de 8 caracteres");
      return;
    }
    if (password == passwordConfirm && validPassword.test(password)) {
      const { error, msg} = await signUp(id, password,firstName, lastName,email,phoneNumber);
      setError(error);
      setMessage(msg);
    }
    if (!error) {
      SwalAlert("success", "Usuario registrado correctamente");
      reset();
    } else {
      SwalAlert("error", message);
    }
    
  };

  return (
    <div >
      <Navbar />
      <div className="container mt-5 " >
        <div className="row rounded" >
        <div className="d-flex flex-row-reverse">
                <button
                  className="btn" style={{backgroundColor:"#3aacb0", color:"white"}}
                  onClick={() => navigate('/')}
                >
                  Inicio
                </button>
              </div>
          <div className="col"></div>

          <div className="col mt-5 bg-light rounded shadow">
            <h2 className="fw-bold text-center">Registrarse</h2>
            <div className="">
              <form onSubmit={handleSubmit}>
              <div className="mb-4">
                  <label className="form-label" htmlFor="text">
                    Identificación
                  </label>
                  <input
                    className="form-control"
                    name="id"
                    type="text"
                    placeholder="Id"
                    value={id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="text">
                    Nombre
                  </label>
                  <input
                    className="form-control"
                    name="firstName"
                    type="text"
                    placeholder="Nombre"
                    value={firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="text">
                    Apellido
                  </label>
                  <input
                    className="form-control"
                    name="lastName"
                    type="text"
                    placeholder="Apellido"
                    value={lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label" htmlFor="number">
                    Telefono
                  </label>
                  <input
                    className="form-control"
                    name="phoneNumber"
                    type="number"
                    placeholder="Telefono"
                    value={phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
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
                <div className="mb-4">
                  <label className="form-label" htmlFor="password">
                    Confirmar Contraseña
                  </label>
                  <input
                    className="form-control"
                    name="passwordConfirm"
                    type="password"
                    placeholder="******"
                    value={passwordConfirm}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="d-grid">
                  <input
                    className="btn "
                    style={{backgroundColor:"#3aacb0", color:"white"}}
                    type="submit"
                    value="Registrarse"
                  />
                </div>
                <div className="mt-4">
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

//{error ? <ErrorAlert text={message} /> : null}