import { Link } from "react-router-dom";
import { AdminNavBar } from "../../components/navbar/AdminNavBar";
import { useContext, useEffect, useRef, useState } from "react";
import { getProducts } from "../../services/product";
import { AuthContext } from "../../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { getCategories } from "../../services/category";
import { getSubCategories } from "../../services/subCategory";
import { deleteProduct } from "../../services/product";
import {
  SwalAlertWithConfirm,
  SwalAlert,
} from "../../components/alerts/SwalAlert";
import { getOrders } from "../../services/orders";

export const AdminProducts = () => {
  const styles = {
    header: {
      height: "100vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },

    content: {
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const [products, setProducts] = useState([]);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formValues, handleInputChange, reset] = useForm({
    productName: "",
    category: "Seleccione una categoria",
    subCategory: "Seleccione una sub-categoria",
  });

  const { productName, category, subCategory } = formValues;

  useEffect(() => {
    async function getInfo() {
      const arrayOfProducts = [];

      const listOfProducts = await getProducts();
      listOfProducts.forEach((product) => {
        arrayOfProducts.push(product);
      });
      setProducts(arrayOfProducts);

      const arrayOfCategories = [];
      const arrayOfSubCategories = [];
      const listOfCategories = await getCategories();
      const listOfSubCategories = await getSubCategories();
      arrayOfCategories.push({
        value: null,
        name: "Seleccione una categoria",
      });
      listOfCategories.map((category) => {
        arrayOfCategories.push({
          value: category.id,
          name: category.name,
        });
      });

      arrayOfSubCategories.push({
        value: null,
        name: "Seleccione una sub-categoria",
      });
      listOfSubCategories.map((subCategory) => {
        arrayOfSubCategories.push({
          value: subCategory.id,
          name: subCategory.name,
        });
      });

      setCategories(arrayOfCategories);
      setSubCategories(arrayOfSubCategories);
    }
    getInfo();
  }, []);

  const handleClickEdit = (product) => {
    navigate(`edit_product`, { state: { product } });
  };

  const navigate = useNavigate();

  const handleClickSearch = async () => {
    if (
      productName == "" &&
      category == "Seleccione una categoria" &&
      subCategory == "Seleccione una sub-categoria"
    ) {
      const arrayOfProducts = [];
      const listOfProducts = await getProducts();
      listOfProducts.forEach((product) => {
        arrayOfProducts.push(product);
      });
      setProducts(arrayOfProducts);
      return;
    }

    if (
      productName != "" &&
      category != "Seleccione una categoria" &&
      subCategory != "Seleccione una sub-categoria"
    ) {
      const filteredProducts = []; //= products.filter((product) => { product.category.id =! category });

      products.forEach((product) => {
        if (
          product.category.id == category &&
          product.subCategory.id == subCategory &&
          product.name.toLowerCase().includes(productName.toLowerCase())
        ) {
          filteredProducts.push(product);
        }
      });
      setProducts(filteredProducts);
      return;
    }

    if (
      productName != "" &&
      category != "Seleccione una categoria" &&
      subCategory == "Seleccione una sub-categoria"
    ) {
      const filteredProducts = [];
      products.forEach((product) => {
        if (
          product.category.id == category &&
          product.name.toLowerCase().includes(productName.toLowerCase())
        ) {
          filteredProducts.push(product);
        }
      });
      setProducts(filteredProducts);
      return;
    }

    if (
      productName != "" &&
      category == "Seleccione una categoria" &&
      subCategory != "Seleccione una sub-categoria"
    ) {
      const filteredProducts = [];
      products.forEach((product) => {
        if (
          product.subCategory.id == subCategory &&
          product.name.toLowerCase().includes(productName.toLowerCase())
        ) {
          filteredProducts.push(product);
        }
      });
      setProducts(filteredProducts);
      return;
    }

    if (
      productName == "" &&
      category != "Seleccione una categoria" &&
      subCategory == "Seleccione una sub-categoria"
    ) {
      const filteredProducts = [];
      products.forEach((product) => {
        if (product.category.id == category) {
          filteredProducts.push(product);
        }
      });
      setProducts(filteredProducts);
      return;
    }

    if (
      productName == "" &&
      category == "Seleccione una categoria" &&
      subCategory != "Seleccione una sub-categoria"
    ) {
      const filteredProducts = [];
      products.forEach((product) => {
        if (product.subCategory.id == subCategory) {
          filteredProducts.push(product);
        }
      });
      setProducts(filteredProducts);
      return;
    }

    if (productName != "") {
      const filteredProducts = [];
      products.forEach((product) => {
        if (product.name.toLowerCase().includes(productName.toLowerCase())) {
          filteredProducts.push(product);
        }
      });
      setProducts(filteredProducts);
      return;
    }
  };

  const handleClickDelete = async (id) => {
    let safeDelete = true;
    SwalAlertWithConfirm(
      "warning",
      "¿Está seguro de eliminar el producto?",
      "Si",
      "Cancelar"
    ).then(async (result) => {
      if (result.isConfirmed) {
        let validate = true;
        const validateOrders = await getOrders();
        validateOrders.forEach((order) => {
          if (order.product.id === id) {
            SwalAlert(
              "error",
              "No se puede eliminar el producto, ya que se encuentra en una orden"
            );
            validate = false;
            return;
          }
        });

        if (validate) {
          const aux = [];
          products.forEach((product) => {
            if (product.id !== id) {
              aux.push(product);
            }
          });
          setProducts(aux);
          const { error, msg } = await deleteProduct(id);
          SwalAlert("success", "Producto eliminado");
        }

      } else {
        SwalAlert("error", "Se mantuvo la cantidad original");
        return;
      }
    });
  };

  const ResetAll = async () => {
    reset();
    const arrayOfProducts = [];
    const listOfProducts = await getProducts();
    listOfProducts.forEach((product) => {
      arrayOfProducts.push(product);
    });
    setProducts(arrayOfProducts);
    return;
  };

  return (
    <>
      <AdminNavBar />
      <div className="container mt-5">
        <div className="card rounded shadow">
          <button
            className="btn"
            style={{
              backgroundColor: "#3aacb0",
              color: "white",
              width: "150px",
              marginLeft: "1100px",
              marginTop: "20px",
            }}
            onClick={() => navigate("/")}
          >
            Volver al Inicio
          </button>
          <div className="container">
            <div className="row">
              <div className="col">
                <br />
                <label className="form-label">Nombre del producto</label>
                <input
                  style={{ width: "400px" }}
                  className="form-control"
                  name="productName"
                  type="text"
                  placeholder="Buscar"
                  value={productName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col">
                <label style={{ marginTop: "24px" }} className="form-label">
                  Categoría
                </label>
                <select
                  className="form-select mb-3"
                  value={category}
                  onChange={handleInputChange}
                  name="category"
                  defaultValue={categories[1]}
                >
                  {categories.map((list, i) => (
                    <option key={i} value={list.value}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col">
                <label style={{ marginTop: "24px" }} className="form-label">
                  Sub-Categoría
                </label>
                <select
                  className="form-select mb-3"
                  value={subCategory}
                  onChange={handleInputChange}
                  name="subCategory"
                  defaultValue={categories[1]}
                >
                  {subCategories.map((list, i) => (
                    <option key={i} value={list.value}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="d-flex">
            <div className="col">
              <button
                style={{ marginLeft: "430px", width: "200px" }}
                className="btn btn-primary"
                onClick={() => handleClickSearch()}
              >
                Buscar
              </button>
            </div>
            <div className="col">
              <button
                style={{ marginLeft: "20px", width: "200px" }}
                className="btn btn-primary"
                onClick={() => ResetAll()}
              >
                Restablecer
              </button>
            </div>
          </div>
          <label
            style={{
              paddingLeft: "590px",
              fontSize: "30px",
              fontWeight: "bold",
              paddingTop: "10px",
            }}
            htmlFor=""
          >
            Inventario
          </label>

          <button
            className="btn btn-success"
            style={{
              color: "white",
              width: "150px",
              marginLeft: "582px",
              marginTop: "20px",
            }}
            onClick={() => navigate("add_product")}
          >
            Agregar Producto
          </button>
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
                          Stock
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Talla
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Precio
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          Categoria
                        </th>
                        <th
                          style={{
                            padding: "5px",
                            backgroundColor: " #3aacb0 ",
                          }}
                        >
                          SubCategoria
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
                      {products.length > 0 &&
                        products.map((product) => (
                          <tr key={product.id}>
                            <td>
                              <img
                                style={{ height: "80px", width: "80px" }}
                                src={product.image}
                                alt="F"
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>{product.brand}</td>
                            <td>{product.stock}</td>
                            <td>{product.size}</td>
                            <td>{product.unitPrice}</td>
                            <td>{product.category.name}</td>
                            <td>{product.subCategory.name}</td>

                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => handleClickEdit(product)}
                              >
                                Gestionar
                              </button>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger"
                                onClick={() => handleClickDelete(product.id)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
