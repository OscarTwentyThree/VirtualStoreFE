import billIcon from "/bill_icon.jpg";
import personalInfoicon from "/personal_info_icon.avif";
import inventoryIcon from "/inventory_icon.jpg";
import { AdminNavBar } from "../components/navbar/AdminNavBar";
import { MenuCard } from "../components/cards/MenuCard";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useEffect, useState } from "react";

export const Admin = () => {
  const navigate = useNavigate();
  return (
    <>
      <AdminNavBar />
      <div className="container mt-5">
        <div className="d-flex flex-row-reverse"></div>
        <h2 className="mb-5 display-5" style={{ marginLeft: "380px" }}>
          Opciones de Administrador
        </h2>
        <div className="row">
          <div className="col">
            <MenuCard
              title={"1.Gestionar información personal"}
              link={"/admin/profile"}
              fondo={personalInfoicon}
            />
          </div>
          <div className="col">
            <MenuCard
              title={"2.Gestionar pedidos"}
              link={"/admin/bill_management"}
              fondo={billIcon}
            />
          </div>
          <div className="col">
            <MenuCard
              title={"3.Gestionar inventario"}
              link={"/admin/inventory"}
              fondo={inventoryIcon}
            />
          </div>
        </div>
      </div>
    </>
  );
};
