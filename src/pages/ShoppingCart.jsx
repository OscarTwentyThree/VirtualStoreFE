import { useContext, useEffect, useRef, useState } from "react";
import { getProducts } from "../services/product";
import { CustomerNavBar } from "../components/navbar/CustomerNavBar";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  SwalAlertWithConfirm,
  SwalAlert,
} from "../components/alerts/SwalAlert";
import { useForm } from "../hooks/useForm";

export const ShoppingCart = () => {
  const [orders, setOrders] = useState([]);
  const [editar, setEditar] = useState(false);

  const { data } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formValues, handleInputChange, reset] = useForm({
    quantity: 1,
  });

  const { quantity } = formValues;

  //localStorage.setItem("editar", JSON.stringify(false));

  const handleClickRemove = (id) => {
    SwalAlertWithConfirm(
      "warning",
      "¿Está seguro de eliminar este producto del carrito?",
      "Si",
      "Cancelar"
    ).then((result) => {
      if (result.isConfirmed) {
        const alreadyRemoved = orders.filter(
          (order) => order.product.id !== id
        );
        setOrders(alreadyRemoved);
        localStorage.setItem("cart", JSON.stringify(alreadyRemoved));
        SwalAlert("success", "Producto eliminado del carrito");
      } else {
        SwalAlert("error", "Error al eliminar el producto del carrito");
        return;
      }
    });
  };

  const handleClickBilling = () => {
    SwalAlertWithConfirm(
      "warning",
      "¿Está seguro de ir a la facturación?",
      "Si",
      "Cancelar"
    ).then((result) => {
      if (result.isConfirmed) {
        navigate("/customer/billing_page");
      } else {
        SwalAlert("error", "Error al ir a facturación");
        return;
      }
    });
  };

  useEffect(() => {
    async function getCart() {
      setOrders(
        localStorage.getItem("cart")
          ? JSON.parse(localStorage.getItem("cart"))
          : []
      );
    }
    getCart();
  }, []);

  const displayActionButtom = () => {
    console.log(orders.length);
    if (orders.length != 0) {
      return (
        <div className="container">
          <div className="row">
            <div className="col">
              <button
                style={{ marginLeft: "460px" }}
                className="btn btn-primary"
                onClick={() => handleClickBilling()}
              >
                Ir a facturación
              </button>
            </div>
            <br />
            <div className="col">
              <button className="btn btn-primary" onClick={() => navigate("/")}>
                Ir a los produtos
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div>
            <label
              style={{
                marginLeft: "440px",
                fontSize: "25px",
                fontWeight: "bold",
              }}
            >
              No hay productos en el carrito
            </label>
          </div>
          <br />
          <button
            style={{ marginLeft: "535px" }}
            className="btn btn-primary"
            onClick={() => navigate("/")}
          >
            Ir a los produtos
          </button>
        </div>
      );
    }

    //style={{marginLeft: "550px"}}
  };

  const handleClickEditar = () => {
    setEditar(true);
  };

  const editQuantity = (i) => {
    SwalAlertWithConfirm(
      "warning",
      "¿Está de seguro cambiar la cantidad de la orden?",
      "Si",
      "Cancelar"
    ).then((result) => {
      if (result.isConfirmed) {
        orders[0].quantity = quantity;
        orders[0].amount = orders[0].product.unitPrice * quantity;
        localStorage.setItem("cart", JSON.stringify(orders));
        setEditar(false);

      } else {
        SwalAlert("error", "Se mantuvo la cantidad original");
        setEditar(false);
        return;
      }
    });

  };

  const displayEditOrConfirm = () => {
    if (editar) {
      return (
        <button
          className="btn btn-primary"
          onClick={() => editQuantity(0)}
        >
          Confirmar
        </button>
      );
    } else {
      return (
        <button
          className="btn btn-primary"
          onClick={() => handleClickEditar(0)}
        >
          Editar
        </button>
      );
    }
  };


  const displayinput = (order) => {
    if (editar) {
      return (
        <td>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleInputChange}
            required
            min="1"
            max={order.product.stock}
          />
        </td>
      );
    } else {
    }
    return <td>{order.quantity}</td>;
  };

  console.log(JSON.parse(localStorage.getItem("cart")));

  return (
    <>
      <CustomerNavBar />
      <div className="container mt-5">
        <div className="card rounded shadow">
          <label
            style={{
              paddingLeft: "510px",
              fontSize: "30px",
              fontWeight: "bold",
              paddingTop: "10px",
            }}
            htmlFor=""
          >
            Carrito de compras
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
                          Total
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Acciones
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Eliminar
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
                            {displayinput(order)}
                            <td>{'₡' + order.amount}</td>
                            <td>{displayEditOrConfirm()}</td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  handleClickRemove(order.product.id)
                                }
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div>{displayActionButtom()}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

//<button style={{marginLeft: "550px"}}className="btn btn-primary" onClick={() =>handleClickBilling()}>Ir a facturación</button>
