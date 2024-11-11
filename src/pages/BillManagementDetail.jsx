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
  SwalAlertPass,
} from "../components/alerts/SwalAlert";
import { Link } from "react-router-dom";
import { updateBill } from "../services/bill";
import { UpdateProduct } from "../services/product";

export const BillManagmentDetail = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const { data, dispatch } = useContext(AuthContext);

  const bill = location.state.bill;

  const date = new Date(bill.date);

  const manageBill = async (action) => {
    if (action == 1) {
      SwalAlertWithConfirm(
        "warning",
        "¿Está Seguro de confirmar la entrega de su pedido?",
        "Si",
        "Cancelar"
      ).then(async (result) => {
        if (result.isConfirmed) {
          const response = await updateBill(
            bill.id,
            bill.total,
            bill.subtotal,
            bill.tax,
            bill.date,
            { id: data.data.data.id },
            { id: bill.paymentMethod.id },
            { id: 52 },
            { id: bill.shippingAddress.id }
          );
          SwalAlert("success", "Se ha confirmado la entrega, muchas gracias!!");
          navigate("/customer/profile");
        } else {
          SwalAlert("error", "Error al confirmar la entrega");
          return;
        }
      });
    }

    if (action == 2) {
      SwalAlertWithConfirm(
        "warning",
        "¿Está Seguro de cancelar su pedido?",
        "Si",
        "Cancelar"
      ).then(async (result) => {
        if (result.isConfirmed) {
          const response = await updateBill(
            bill.id,
            bill.total,
            bill.subtotal,
            bill.tax,
            bill.date,
            { id: data.data.data.id },
            { id: bill.paymentMethod.id },
            { id: 3 },
            { id: bill.shippingAddress.id }
          );

          bill.orders.forEach(async (order) => {
            const responseUpdate = await UpdateProduct(
              order.product.id,
              order.product.name,
              order.product.brand,
              order.product.description,
              order.product.image,
              order.product.stock + order.quantity,
              order.product.unitPrice,
              order.product.size,
              order.product.category,
              order.product.subCategory
            );
          });
          SwalAlertPass(
            "success",
            "Su pedido ha sido cancelado, se le devolverá el dinero en un plazo de 15 dias hábiles"
          );
          navigate("/customer/profile");
        } else {
          SwalAlert("error", "Error al cancelar el pedido");
          return;
        }
      });
    }

    if (action == 3) {
      SwalAlertWithConfirm(
        "warning",
        "¿Está seguro solicitar la devolucion de su pedido ?",
        "Si",
        "Cancelar"
      ).then(async (result) => {
        if (result.isConfirmed) {
          const response = await updateBill(
            bill.id,
            bill.total,
            bill.subtotal,
            bill.tax,
            bill.date,
            { id: data.data.data.id },
            { id: bill.paymentMethod.id },
            { id: 4 },
            { id: bill.shippingAddress.id }
          );
          SwalAlertPass(
            "success",
            "Su devolución ha sido solicitada, se le contactará para coordinar la devolución"
          );
          navigate("/customer/profile");
        } else {
          SwalAlert("error", "Error al cancelar el pedido");
          return;
        }
      });
    }
  };

  const displayActionButtom = () => {
    let today = new Date();
    let Difference_In_Time =  today.getTime() - date.getTime();

    let Difference_In_Days = Math.round(
      Difference_In_Time / (1000 * 3600 * 24)
    );

    console.log(Math.abs(Difference_In_Days));
    if (bill.status.id == 1) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <button
                style={{ marginLeft: "416px", width: "200px" }}
                className="btn btn-success"
                onClick={() => manageBill(1)}
              >
                Confirmar entrega
              </button>
            </div>
            <br />
            <div className="col">
              <button
                style={{ width: "200px" }}
                className="btn btn-danger"
                onClick={() => manageBill(2)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (bill.status.id == 2) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <button
                style={{ marginLeft: "530px", width: "200px" }}
                className="btn btn-danger"
                onClick={() => manageBill(2)}
              >
                Cancelar
              </button>
            </div>
            <br />
          </div>
        </div>
      );
    }

    if (bill.status.id == 52 && Math.abs(Difference_In_Days) < 30) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <button
                style={{ marginLeft: "530px", width: "200px" }}
                className="btn btn-warning"
                onClick={() => manageBill(3)}
              >
                Solicitar devolución
              </button>
            </div>
            <br />
          </div>
        </div>
      );
    }

    if (bill.status.id == 3) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <label style={{ marginLeft: "425px", fontSize: "20px" }}>
                Pedido cancelado no hay acciones disponibles
              </label>
            </div>
            <br />
          </div>
        </div>
      );
    }

    if (bill.status.id == 52 && Math.abs(Difference_In_Days) > 30) {
        return (
          <div className="container">
            <div className="row">
              <div className="col">
                <label style={{ marginLeft: "360px", fontSize: "20px" }}>
                    El pedido ha sido entregado y no se pueden realizar acciones.
                </label>
                <br />
                <label style={{ marginLeft: "350px", fontSize: "20px" }}>
                    El plazo de <label style={{color:"red"}}>30</label> días hábiles para solicitar devolución ha expirado.
                </label>
              </div>
              <br />
            </div>
          </div>
        );
      }

      if (bill.status.id == 4) {
        return (
          <div className="container">
            <div className="row">
              <div className="col">
                <label style={{ marginLeft: "325px", fontSize: "20px" }}>
                  El proceso de devolución ha sido solicitado, no hay acciones disponibles.
                </label>
              </div>
              <br />
            </div>
          </div>
        );
      }

      if (bill.status.id == 102) {
        return (
          <div className="container">
            <div className="row">
              <div className="col">
                <label style={{ marginLeft: "360px", fontSize: "20px" }}>
                  La devolucion ha sido aceptada, no hay acciones disponibles.
                </label>
              </div>
              <br />
            </div>
          </div>
        );
      }

      if (bill.status.id == 152) {
        return (
          <div className="container">
            <div className="row">
              <div className="col">
                <label style={{ marginLeft: "360px", fontSize: "20px" }}>
                  La devolucion ha sido rechazada, no hay acciones disponibles.
                </label>
              </div>
              <br />
            </div>
          </div>
        );
      }
      
  };

  return (
    <>
      <CustomerNavBar />
      <div className="container mt-5">
        <div className="card rounded shadow">
          <div className="d-flex flex-row-reverse">
            <button
              className="btn"
              style={{
                backgroundColor: "#3aacb0",
                color: "white",
                marginRight: "10px",
                marginTop: "10px",
              }}
              onClick={() => navigate("/customer/profile/bill_management")}
            >
              Volver
            </button>
          </div>
          <label
            style={{
              paddingLeft: "600px",
              fontSize: "30px",
              fontWeight: "bold",
              paddingTop: "10px",
            }}
            htmlFor=""
          >
            Productos
          </label>
          <div className="card-body">
            <div className="row">
              <div className="">
                <br />
                <div className="overflow-auto">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Imagen
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Nombre
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Marca
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Cantidad
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bill.orders.length > 0 &&
                        bill.orders.map((order, i) => (
                          <tr key={i}>
                            <td>
                              <img
                                style={{ height: "80px", width: "80px" }}
                                src={order.product.image}
                                alt="F"
                              />
                            </td>
                            <td>{order.product.name}</td>
                            <td>{order.product.brand}</td>
                            <td>{order.quantity}</td>
                            <td>{order.amount}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <br />
                  <div className="container">
                    <div className="row">
                      <div
                        className="col"
                        style={{ paddingRight: "40px", alignContent: "center" }}
                      >
                        <label
                          style={{
                            paddingLeft: "250px",
                            fontSize: "20px",
                            fontWeight: "bold",
                            paddingTop: "10px",
                          }}
                        >
                          SubTotal:
                          {" " + bill.subtotal}
                        </label>
                        <br />
                        <label
                          style={{
                            paddingLeft: "250px",
                            fontSize: "20px",
                            fontWeight: "bold",
                            paddingTop: "10px",
                          }}
                        >
                          IVA:{" " + bill.tax}
                        </label>
                        <br />
                        <label
                          style={{
                            paddingLeft: "250px",
                            fontSize: "20px",
                            fontWeight: "bold",
                            paddingTop: "10px",
                          }}
                        >
                          Total:{" " + bill.total}
                        </label>
                        <br />
                      </div>
                      <div
                        className="col"
                        style={{
                          paddingLeft: "150px",
                          paddingRight: "100px",
                          alignContent: "center",
                        }}
                      >
                        <label
                          style={{
                            paddingLeft: "150px",
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Detalles de envio
                        </label>
                        <br />
                        <br />
                        <div style={{ borderStyle: "solid" }} className="row">
                          <div
                            style={{
                              backgroundColor: "#c4c4c4",
                              fontWeight: "bold",
                            }}
                            className="col"
                          >
                            Ciudad:
                          </div>
                          <div
                            style={{ backgroundColor: "#d6d6d6" }}
                            className="col"
                          >
                            {bill.shippingAddress.city}
                          </div>
                          <div className="w-200"></div>
                          <div
                            style={{
                              backgroundColor: "#d6d6d6",
                              fontWeight: "bold",
                            }}
                            className="col"
                          >
                            Estado:
                          </div>
                          <div
                            style={{ backgroundColor: "#c4c4c4" }}
                            className="col"
                          >
                            {bill.shippingAddress.state}
                          </div>
                          <div className="w-200"></div>
                          <div
                            style={{
                              backgroundColor: "#c4c4c4",
                              fontWeight: "bold",
                            }}
                            className="col"
                          >
                            País:
                          </div>
                          <div
                            style={{ backgroundColor: "#d6d6d6" }}
                            className="col"
                          >
                            {bill.shippingAddress.country}
                          </div>
                          <div className="w-200"></div>
                          <div
                            style={{
                              backgroundColor: "#d6d6d6",
                              fontWeight: "bold",
                            }}
                            className="col"
                          >
                            Calle o Dirección:
                          </div>
                          <div
                            style={{ backgroundColor: "#c4c4c4" }}
                            className="col"
                          >
                            {bill.shippingAddress.street}
                          </div>
                          <div className="w-200"></div>
                          <div
                            style={{
                              backgroundColor: "#c4c4c4",
                              fontWeight: "bold",
                            }}
                            className="col"
                          >
                            Codigo Postal:
                          </div>
                          <div
                            style={{ backgroundColor: "#d6d6d6" }}
                            className="col"
                          >
                            {bill.shippingAddress.zipCode}
                          </div>
                          <div className="w-200"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <br />
                  <label style={{ fontSize: "30px", marginLeft: "390px" }}>
                    Acciones disponibles para este pedido
                  </label>
                  <br />
                  <br />
                  <div>{displayActionButtom()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
