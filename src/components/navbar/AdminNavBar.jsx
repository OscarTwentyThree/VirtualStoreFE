import React from "react";
import { Link } from "react-router-dom";
import logo from "../../imgs/logo.png";
import { types } from "../../types/types";
import { SwalAlertWithConfirm } from "../alerts/SwalAlert";
import { AuthContext } from "../../auth/AuthContext";
import { useContext, useState } from "react";

export const AdminNavBar = () => {
  const { data, dispatch } = useContext(AuthContext);
  const [usuario, setUsuario] = useState(data.data.data);


  const handleLogout = () => {
    SwalAlertWithConfirm(
      "warning",
      "¿Está seguro de cerrar sesión?",
      "Cerrar Sesión",
      "Cancelar"
    ).then((result) => {
      if (result.isConfirmed) {
        dispatch({
          type: types.logout,
        });
      } else {
        return;
      }
    });
  };
  return (
    <nav
      style={{
        padding: "5px",
        backgroundColor: "#3aacb0 ",
        alignContent: "flex-start",
      }}
      className=" navbar"
    >
      <div className="container">
        <div className="row" style={{
                alignContent: "flex-start",
                backgroundColor: "white",
                borderRadius: "25px",
              }}>
          <div className="col">
            <Link className="navbar-brand " to={"/"}>
              <img
                src={logo}
                width="50"
                height="50"
                className="d-inline-block align-top"
                alt=""
                style={{
                  padding: "1px",
                  marginTop: "2px",
                  marginLeft: "10px",
                }}
              />
            </Link>
          </div>
          <div className="col">
            <label
              style={{
                alignContent: "flex-start",
                padding: "5px",
                fontSize: "30px",
                fontWeight: "bold",
                marginRight: "10px",
                backgroundColor: "white",
                color: " #3aacb0 ",
                borderRadius: "25px",
              }}
              htmlFor=""
            >
              ShopTop
            </label>
          </div>
        </div>
        <div className="d-flex" style={{marginLeft:"500px", backgroundColor:"white",borderRadius: "25px",padding:"2px"}}>
          <img style={{padding:"5px",height: "50px",width: "50px",borderRadius: "50%"}}src="/images/User.png" alt="F" />
        <label style={{paddingLeft: "20px",padding: "5px",fontSize: "25px",fontWeight: "bold",color:""}} >{data.data.data.firstName + " " + data.data.data.lastName}</label>
        </div>
        <button className="btn btn-light" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};
