import React from "react";
import { HiDocumentSearch } from "react-icons/hi";
import { Link } from "react-router-dom";
import logo from "../../imgs/logo.png";

export const Navbar = () => {
  return (
    <nav
      style={{
        padding: "5px",
        backgroundColor: "#3aacb0",
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
                color: "#3aacb0",
                borderRadius: "25px",
              }}
              htmlFor=""
            >
              ShopTop
            </label>
          </div>
        </div>
        <div className="d-flex">
          <Link to="/login" className="btn btn-light">
            Login
          </Link>
          <div style={{ padding: "6px" }} className="d-flex justify-content-left">
          <label htmlFor=""> or </label>
          </div>
          <Link to="/signup" className="btn btn-light">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

//"d-flex justify-content-left"