import React from "react";
import { types } from "../../types/types";
import { SwalAlertWithConfirm } from "../../components/alerts/SwalAlert";
import { Link } from "react-router-dom";
import logo from "../../imgs/logo.png";
import { AuthContext } from "../../auth/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
export const CustomerNavBar = () => {
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
        localStorage.setItem("cart", JSON.stringify([]));
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
        <Link className="navbar-brand" to={"/customer/profile"}>
        <img style={{padding:"5px",height: "50px",width: "50px",borderRadius: "50%"}}src="/images/User.png" alt="F" />
        </Link>
        <label style={{padding: "10px",fontSize: "25px",fontWeight: "bold",color:""}} >{data.data.data.firstName + " " + data.data.data.lastName}</label>
        <Link className="navbar-brand" to={"/customer/shopping_cart"}>
        <img style={{padding:"5px",height: "45px",width: "70px",borderRadius: "50%"}}src="/images/carrito.png" alt="F" />
        </Link>
        </div>
        <button className="btn btn-light" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    </nav>
  );
};
