import React from "react";
import { useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { CustomerNavBar } from "../components/navbar/CustomerNavBar";
import { useForm } from "../hooks/useForm";
import {
  SwalAlertWithConfirm,
  SwalAlert,
} from "../components/alerts/SwalAlert";
import { Link } from "react-router-dom";

export const ProductDetail = ({}) => {
  const location = useLocation();

  const navigate = useNavigate();

  const [formValues, handleInputChange, reset] = useForm({
    quantity: 1,
  });

  const [orders, setOrders] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  const { quantity } = formValues;

  const { data, dispatch } = useContext(AuthContext);

  const product = location.state.product;

  const handleAddToCart = () => {
    if (quantity == 0) {
      SwalAlert("error", "La cantidad no puede ser 0");
      return;
    }
    console.log(quantity);
    SwalAlertWithConfirm(
      "warning",
      "¿Está seguro de agregar este producto al carrito?",
      "Si",
      "Cancelar"
    ).then((result) => {
      if (result.isConfirmed) {
        const order = {
          quantity: quantity,
          amount: product.unitPrice * quantity,
          product: product,
        };

        orders.push(order);
        localStorage.setItem("cart", JSON.stringify(orders));
        data.orders.push(order);
        SwalAlert("success", "Producto agregado al carrito");
      } else {
        SwalAlert("error", "Error al agregar el producto al carrito");
        return;
      }
    });
  };

  const displayOutofStock = () => {
    if (product.stock == 0) {
      return (
        <div className="row">
          <label
            style={{
              paddingLeft: "160px",
              fontSize: "30px",
              fontWeight: "bold",
              backgroundColor: "#ca2f2f",
              color: "white",
              borderRadius: "10px",
            }}
            htmlFor=""
          >
            Producto Agotado
          </label>
        </div>
      );
    } else {
      return (
        <div className="row">
          <label
            style={{
              paddingLeft: "140px",
              fontSize: "30px",
              fontWeight: "bold",
            }}
            htmlFor=""
          >
            Seleccione la cantidad
          </label>
          <div
            style={{ alignContent: "center", paddingLeft: "40px" }}
            className="col"
          >
            <input
              className="form-control"
              name="quantity"
              type="number"
              placeholder="Cantidad"
              value={quantity}
              onChange={handleInputChange}
              defaultValue="1"
              required
              min="1"
              max={product.stock}
              onKeyDown={(event) => {
                event.preventDefault();
              }}
            />
          </div>
          <div
            style={{ alignContent: "center", paddingLeft: "160px" }}
            className="col"
          >
            <button
              className="btn btn-success"
              onClick={() => handleAddToCart(product)}
            >
              Añadir
            </button>
          </div>
        </div>
      );
    }

    //style={{marginLeft: "550px"}}
  };

  return (
    <>
      <CustomerNavBar />
      <div className="container mt-5">
        <div className="card rounded shadow">
          <div className="card-body">
            <div className="container">
              <div className="row">
                <div className="col">
                  <br />
                  <img
                    style={{ height: "450px", width: "450px" }}
                    src={product.image}
                    alt="F"
                  />
                </div>
                <div style={{ paddingRight: "100px" }} className="col">
                  <div
                    style={{ alignContent: "center", paddingLeft: "500px" }}
                    className="col"
                  >
                    <button
                      className="btn"  style={{backgroundColor:"#3aacb0", color:"white"}}
                      onClick={() => navigate("/")}
                    >
                      Volver
                    </button>
                  </div>
                  <label
                    style={{
                      paddingLeft: "140px",
                      fontSize: "30px",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    Detalles del Producto
                  </label>
                  <br />
                  <br />
                  <div style={{ borderStyle: "solid" }} className="row">
                    <div
                      style={{ backgroundColor: "#c4c4c4", fontWeight: "bold" }}
                      className="col"
                    >
                      Nombre:
                    </div>
                    <div style={{ backgroundColor: "#d6d6d6" }} className="col">
                      {product.name}
                    </div>
                    <div className="w-200"></div>
                    <div
                      style={{ backgroundColor: "#d6d6d6", fontWeight: "bold" }}
                      className="col"
                    >
                      Marca
                    </div>
                    <div style={{ backgroundColor: "#c4c4c4" }} className="col">
                      {product.brand}
                    </div>
                    <div className="w-200"></div>
                    <div
                      style={{ backgroundColor: "#c4c4c4", fontWeight: "bold" }}
                      className="col"
                    >
                      Descripcion:
                    </div>
                    <div style={{ backgroundColor: "#d6d6d6" }} className="col">
                      {product.description}
                    </div>
                    <div className="w-200"></div>
                    <div
                      style={{ backgroundColor: "#d6d6d6", fontWeight: "bold" }}
                      className="col"
                    >
                      Talla:
                    </div>
                    <div style={{ backgroundColor: "#c4c4c4" }} className="col">
                      {product.size}
                    </div>
                    <div className="w-200"></div>
                    <div
                      style={{ backgroundColor: "#c4c4c4", fontWeight: "bold" }}
                      className="col"
                    >
                      Unidades:
                    </div>
                    <div style={{ backgroundColor: "#d6d6d6" }} className="col">
                      {product.stock == 0 ? "Agotado" : product.stock}
                    </div>
                    <div className="w-200"></div>
                    <div
                      style={{ backgroundColor: "#d6d6d6", fontWeight: "bold" }}
                      className="col"
                    >
                      Precio por unidad:
                    </div>
                    <div style={{ backgroundColor: "#c4c4c4" }} className="col">
                      {'₡' + product.unitPrice}
                    </div>
                    <div className="w-200"></div>
                    <div
                      style={{ backgroundColor: "#c4c4c4", fontWeight: "bold" }}
                      className="col"
                    >
                      Categoria:
                    </div>
                    <div style={{ backgroundColor: "#d6d6d6" }} className="col">
                      {product.category.name}
                    </div>
                    <div className="w-200"></div>
                    <div
                      style={{ backgroundColor: "#d6d6d6", fontWeight: "bold" }}
                      className="col"
                    >
                      Sub Categoria:
                    </div>
                    <div style={{ backgroundColor: "#c4c4c4" }} className="col">
                      {product.subCategory.name}
                    </div>
                    <div className="w-200"></div>
                  </div>
                  <br />
                  <br />
                  <div>{displayOutofStock()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
