import React from "react";
import { CustomerNavBar } from "../components/navbar/CustomerNavBar";
import { useContext, useEffect, useRef, useState } from "react";
import { getUserBills } from "../services/auth";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const BillManagment = () => {
  const [bills, setBills] = useState([]);
  const { data } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function getInfo() {
      const arrayOfBills = [];

      const User = await getUserBills(data.data.data.id);
      User.bills.forEach((bill) => {
        arrayOfBills.push(bill);
      });
      setBills(arrayOfBills);
    }
    getInfo();
  }, []);

  
  const convertDate = (date) => {
    let newDate = new Date(date);
    return `${newDate.getDate()}-${
      newDate.getMonth() + 1
    }-${newDate.getFullYear()}`;
  };

  const handleClickManagement = (bill) => {
    navigate(`bill_detail`, { state: { bill } });
  };

  const displayMsg = () => {
    if (bills.length == 0) {
      return (
        <div>
          <label
            style={{
              marginLeft: "430px",
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            No tienes pedidos para gestionar
          </label>
        </div>
      );
    }
  };

  return (
    <>
      <CustomerNavBar />
      <div className="container mt-5">
        <div className="card rounded shadow">
          <label
            style={{
              paddingLeft: "580px",
              fontSize: "30px",
              fontWeight: "bold",
              paddingTop: "10px",
            }}
            htmlFor=""
          >
            Pedidos
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
                          Número de factura
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Fecha de pedido
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Monto Total
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Método de pago
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Estado
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bills.length > 0 &&
                        bills.map((bill, i) => (
                          <tr key={bill.id}>
                            <td>{bill.id}</td>
                            <td>{convertDate(bill.date)}</td>
                            <td>{'₡' +bill.total}</td>
                            <td>{bill.paymentMethod.name}</td>
                            <td>{bill.status.name}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => handleClickManagement(bill)}
                              >
                                Gestionar
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {displayMsg()}
                  <br />
                  <div>
                    <button
                      className="btn btn-primary" style={{marginLeft: "575px"}}
                      onClick={() => navigate('/customer/profile')}
                    >
                      Volver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
