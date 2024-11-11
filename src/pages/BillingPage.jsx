import { useContext, useEffect, useRef, useState } from "react";
import { UpdateProduct } from "../services/product";
import { CustomerNavBar } from "../components/navbar/CustomerNavBar";
import { AuthContext } from "../auth/AuthContext";
import { Await, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  SwalAlertWithConfirm,
  SwalAlert,
} from "../components/alerts/SwalAlert";
import { useForm } from "../hooks/useForm";
import { getPaymentMethods } from "../services/paymentMethods";
import { addShippingAddress, AddBill, AddOrder } from "../services/bill";

export const BillingPage = () => {
  const [orders, setOrders] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const { data } = useContext(AuthContext);

  const navigate = useNavigate();

  const [BillFormValues, handleInputChange, reset] = useForm({
    city: "",
    state: "",
    country: "",
    street: "",
    zipCode: "",
    paymentMethod: null,
    cardNumber: "",
    cvc: "",
    expirationDate: "",
  });

  const {
    city,
    state,
    country,
    street,
    zipCode,
    paymentMethod,
    cardNumber,
    cvc,
    expirationDate,
  } = BillFormValues;

  const handleClickBilling = async () => {
    let pMType = 0;
    if (paymentMethod == 1) {
      pMType = 1;
    } else {
      pMType = 2;
    }

    if (paymentMethod == null) {
      SwalAlert("error", "Seleccione un metodo de pago");
      return;
    }
    if (paymentMethod != 1) {
      if (
        city == "" ||
        state == "" ||
        country == "" ||
        street == "" ||
        zipCode == ""
      ) {
        SwalAlert("error", "Rellene todos los campos");
        return;
      }
    }

    if (paymentMethod == 1) {
      if (
        cardNumber == "" ||
        cvc == "" ||
        expirationDate == "" ||
        city == "" ||
        state == "" ||
        country == "" ||
        street == "" ||
        zipCode == ""
      ) {
        SwalAlert("error", "Rellene todos los campos");
        return;
      }
    }

    SwalAlertWithConfirm(
      "warning",
      "¿Está Seguro de confirmar la compra?",
      "Si",
      "Cancelar"
    ).then(async (result) => {
      if (result.isConfirmed) {
        const responseSh = await addShippingAddress(
          city,
          state,
          country,
          street,
          zipCode
        );
        console.log(responseSh);

        const responseB = await AddBill(
          new Date(),
          parseFloat(
            orders.reduce((acc, order) => acc + order.amount, 0) -
              parseFloat(
                orders.reduce((acc, order) => acc + order.amount, 0) * 0.13
              ).toFixed(2)
          ).toFixed(2),
          orders.reduce((acc, order) => acc + order.amount, 0),
          parseFloat(
            orders.reduce((acc, order) => acc + order.amount, 0) * 0.13
          ).toFixed(2),
          { id: paymentMethod },
          { id: responseSh.data.id },
          { id: pMType },
          { id: data.data.data.id }
        );

        JSON.parse(localStorage.getItem("cart")).forEach(async (order) => {
          const responseO = await AddOrder(
            order.amount,
            order.quantity,
            { id: order.product.id },
            { id: responseB.data.id }
          );
          const responseUpdate = await UpdateProduct(
            order.product.id,
            order.product.name,
            order.product.brand,
            order.product.description,
            order.product.image,
            order.product.stock - order.quantity,
            order.product.unitPrice,
            order.product.size,
            order.product.category,
            order.product.subCategory
          );
        });
        reset();
        localStorage.removeItem("cart");
        localStorage.setItem("cart", JSON.stringify([]));
        SwalAlert(
          "success",
          "Compra realizada con éxito, puede gestionar sus compras desde su perfil"
        );
        navigate("/customer/shopping_cart");
      } else {
        SwalAlert("error", "Error al ir a facturación");
        return;
      }
    });
  };

  function getRandomIntInclusive(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
  }
  

  const displayPaymentMethod = () => {
    if (paymentMethod == 1) {
      return (
        <div
          style={{ marginLeft: "150px", marginRight: "150px" }}
          className="col mt-5 bg-light rounded shadow"
        >
          <h2 className="fw-bold text-center">
            Ingrese los datos de su tarjeta
          </h2>
          <div className="">
            <form>
              <div
                style={{ marginLeft: "10px", marginRight: "10px" }}
                className="mb-4"
              >
                <label className="form-label" htmlFor="text">
                  Numero de tarjeta
                </label>
                <input
                  className="form-control"
                  name="cardNumber"
                  type="text"
                  placeholder="Numero de tarjeta"
                  value={cardNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div
                style={{ marginLeft: "10px", marginRight: "10px" }}
                className="mb-4"
              >
                <label className="form-label" htmlFor="text">
                  CVC
                </label>
                <input
                  className="form-control"
                  name="cvc"
                  type="text"
                  placeholder="CVC"
                  value={cvc}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div
                style={{ marginLeft: "10px", marginRight: "10px" }}
                className="mb-4"
              >
                <label className="form-label" htmlFor="text">
                  Fecha de expiración
                </label>
                <input
                  className="form-control"
                  name="expirationDate"
                  type="text"
                  placeholder="Fecha de expiración"
                  value={expirationDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="d-grid"></div>
            </form>
          </div>
        </div>
      );
    }
    if (paymentMethod == 2) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <label style={{ marginLeft: "500px", fontSize: "20px" }}>Numero de referencia: <label style={{color:"red"}}>{getRandomIntInclusive(700000, 2000000)}</label>
              </label>
              <label style={{ marginLeft: "225px", fontSize: "20px" }}>
                Favor Realizar el pago sl numero (+506) 8888-8888 y adjuntar el numero anterior en el detalle.
              </label>
              <label style={{ marginLeft: "350px", fontSize: "20px" }}>
                Una vez verificado el pago se procedera a realizar el envio.
              </label>
            </div>
            <br />
          </div>
        </div>
      );
    }

    if (paymentMethod == 3) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <label style={{ marginLeft: "220px", fontSize: "20px" }}>
                Una vez realizado el pedido, un mensajero se comunicara con usted para coordinar la entrega.
              </label>
            </div>
            <br />
          </div>
        </div>
      );
    }
  };

  useEffect(() => {
    async function getCart() {
      const arrayOfPM = [];
      const ListOfPM = await getPaymentMethods();

      ListOfPM.forEach((PM) => {
        arrayOfPM.push(PM);
      });
      setOrders(
        localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : []
      );
      setPaymentMethods(arrayOfPM);
    }
    getCart();
  }, []);

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
              onClick={() => navigate("/customer/shopping_cart")}
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
                      {orders.length > 0 &&
                        orders.map((order, i) => (
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
                            paddingLeft: "350px",
                            fontSize: "20px",
                            fontWeight: "bold",
                            paddingTop: "10px",
                          }}
                        >
                          SubTotal:{" "}
                          {parseFloat(
                            orders.reduce(
                              (acc, order) => acc + order.amount,
                              0
                            ) -
                              parseFloat(
                                orders.reduce(
                                  (acc, order) => acc + order.amount,
                                  0
                                ) * 0.13
                              ).toFixed(2)
                          ).toFixed(2)}
                        </label>
                        <br />
                        <label
                          style={{
                            paddingLeft: "350px",
                            fontSize: "20px",
                            fontWeight: "bold",
                            paddingTop: "10px",
                          }}
                        >
                          IVA:{" "}
                          {parseFloat(
                            orders.reduce(
                              (acc, order) => acc + order.amount,
                              0
                            ) * 0.13
                          ).toFixed(2)}
                        </label>
                        <br />
                        <label
                          style={{
                            paddingLeft: "350px",
                            fontSize: "20px",
                            fontWeight: "bold",
                            paddingTop: "10px",
                          }}
                        >
                          Total:{" "}
                          {orders.reduce((acc, order) => acc + order.amount, 0)}
                        </label>
                        <br />
                      </div>
                      <div
                        className="col"
                        style={{
                          paddingLeft: "150px",
                          alignContent: "center",
                        }}
                      >
                        <label
                          style={{
                            fontSize: "20px",
                            fontWeight: "bold",
                          }}
                        >
                          Seleccione el metodo de pago
                        </label>
                        <br />
                        <div value={paymentMethod} onChange={handleInputChange}>
                          {paymentMethods.length > 0 &&
                            paymentMethods.map((PM, i) => (
                              <div key={i}>
                                <input
                                  type="radio"
                                  value={PM.id}
                                  name="paymentMethod"
                                />{" "}
                                {PM.name}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <div>{displayPaymentMethod()}</div>
                <div
                  style={{ marginLeft: "150px", marginRight: "150px" }}
                  className="col mt-5 bg-light rounded shadow"
                >
                  <h2 className="fw-bold text-center">Información de envio</h2>
                  <div className="">
                    <form>
                      <div
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                        className="mb-4"
                      >
                        <label className="form-label" htmlFor="text">
                          Ciudad
                        </label>
                        <input
                          className="form-control"
                          name="city"
                          type="text"
                          placeholder="Ciudad"
                          value={city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                        className="mb-4"
                      >
                        <label className="form-label" htmlFor="text">
                          Estado
                        </label>
                        <input
                          className="form-control"
                          name="state"
                          type="text"
                          placeholder="Estado"
                          value={state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                        className="mb-4"
                      >
                        <label className="form-label" htmlFor="text">
                          País
                        </label>
                        <input
                          className="form-control"
                          name="country"
                          type="text"
                          placeholder="País"
                          value={country}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                        className="mb-4"
                      >
                        <label className="form-label" htmlFor="number">
                          Calle o Direción
                        </label>
                        <input
                          className="form-control"
                          name="street"
                          type="text"
                          placeholder="Calle o Direción"
                          value={street}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div
                        style={{ marginLeft: "10px", marginRight: "10px" }}
                        className="mb-4"
                      >
                        <label className="form-label" htmlFor="email">
                          Código Postal
                        </label>
                        <input
                          className="form-control"
                          name="zipCode"
                          type="text"
                          placeholder="Código Postal"
                          value={zipCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="d-grid"></div>
                    </form>
                  </div>
                </div>
                <br />
                <div>
                  <button
                    style={{ marginLeft: "550px" }}
                    className="btn btn-primary"
                    onClick={() => handleClickBilling()}
                  >
                    Confirmar compra
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
