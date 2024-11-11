import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { types } from "../types/types";
import { signUp, UpdateUserInfo } from "../services/auth";
import { ErrorAlert } from "../components/alerts/Error";
import "bootstrap/dist/css/bootstrap.min.css";
import { SwalAlert,SwalAlertPass } from "../components/alerts/SwalAlert";
import { CustomerNavBar } from "../components/navbar/CustomerNavBar";
import {validPassword} from "../services/regex";

import bcrypt, { compareSync } from "bcryptjs";

export const EditPersonalInformation = () => {
  const { dispatch, data } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [formValues, handleInputChange, reset] = useForm({
    id: data.data.data.id,
    password:"",
    firstName: data.data.data.firstName,
    lastName: data.data.data.lastName,
    email: data.data.data.email,
    phoneNumber: data.data.data.phoneNumber,
    option: "",
    newPass : "",
    newPassConfirmation: "",
  });

  const navigate = useNavigate();

  const { id, password, firstName, lastName, email, phoneNumber, option, newPass,newPassConfirmation } =
    formValues;

  let hash = data.data.data.password;

  const handleSubmit = async (e) => {
    e.preventDefault();


    if(option == "") {
      SwalAlert("error", "Debe seleccionar una opción para la contraseña");
      return;
    }

    if (option == "Si") {
      if (newPass != newPassConfirmation) {
        SwalAlert("error", "Las contraseñas no coinciden");
        return;
      }
    }

    if (option != "" && !bcrypt.compareSync(password, hash)) {
      SwalAlert("error", "Contraseña actual es incorrecta");
      return;
    }




    if(!validPassword.test(password) && option == "No" && !bcrypt.compareSync(password, hash)){
      SwalAlertPass("error", "Contraseña no cumple con los requisitos, debe contener al menos una letra mayúscula, una minúscula, un número y un caracter especial y tener una longitud de 8 caracteres");
      return;
    }

    if(!validPassword.test(newPass) && !validPassword.test(newPassConfirmation) && validPassword.test(password) && option == "Si"){
      SwalAlertPass("error", "Contraseña no cumple con los requisitos, debe contener al menos una letra mayúscula, una minúscula, un número y un caracter especial y tener una longitud de 8 caracteres");
      return;
    }


    if(option == "Si"){
      const { error, msg, data, token } = await UpdateUserInfo(
        id,
        newPass,
        firstName,
        lastName,
        email,
        phoneNumber
      );
      if (!error) {
        dispatch({
          type: types.loginCustomer,
          payload: { data, token},
        });
        SwalAlert("success", msg);
        reset();
      } else {
        SwalAlert("error", msg);
      }
    }

    if(option == "No"){
      const { error, msg, data, token } = await UpdateUserInfo(
        id,
        password,
        firstName,
        lastName,
        email,
        phoneNumber
      );   
      if (!error) {
        dispatch({
          type: types.loginCustomer,
          payload: { data, token},
        });
        SwalAlert("success", msg);
        reset();
      } else {
        SwalAlert("error", msg);
      }
    }
  };


  const displayChangePassword = () => {
    if (option == "") {
      return null;
    }
    if (option == "No") {
      return (
        <div className="mb-4">
          <label className="form-label" htmlFor="password">
            Ingrese su contraseña para confirmar
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
      );
    } else {
      return (
        <div>
          <div className="mb-4">
            <label className="form-label" htmlFor="password">
              Contraseña Actual
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
              Nueva Contraseña
            </label>
            <input
              className="form-control"
              name="newPass"
              type="password"
              placeholder="******"
              value={newPass}
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
              name="newPassConfirmation"
              type="password"
              placeholder="******"
              value={newPassConfirmation}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <CustomerNavBar />
      <div className="container mt-5 ">
        <div className="row rounded">
          <div className="d-flex flex-row-reverse">
            <button
              className="btn"
              style={{ backgroundColor: "#3aacb0", color: "white" }}
              onClick={() => navigate("/customer/profile")}
            >
              Volver
            </button>
          </div>
          <div className="col"></div>

          <div className="col mt-5 bg-light rounded shadow">
            <h2 className="fw-bold text-center">Actualizar datos</h2>
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
                    disabled
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
                <div
                  className="mb-4"
                  value={option}
                  onChange={handleInputChange}
                >
                  <input type="radio" value="Si" name="option" /> Cambiar
                  Contraseña
                  <br />
                  <input type="radio" value="No" name="option" /> Conservar
                  Contraseña
                </div>
                <div>{displayChangePassword()}</div>

                <div className="d-grid">
                  <input
                    className="btn "
                    style={{ backgroundColor: "#3aacb0", color: "white" }}
                    type="submit"
                    value="Actualizar"
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
