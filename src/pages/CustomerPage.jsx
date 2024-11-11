import { useContext, useEffect, useRef, useState } from "react";
import { getProducts } from "../services/product";
import { CustomerNavBar } from "../components/navbar/CustomerNavBar";
import { AuthContext } from "../auth/AuthContext";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "../hooks/useForm";
import { getCategories } from "../services/category";
import { getSubCategories } from "../services/subCategory";

export const CustomerPage = () => {
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

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [formValues, handleInputChange, reset] = useForm({
    productName: "",
    category: "Seleccione una categoria",
    subCategory: "Seleccione una sub-categoria",
  });

  const { productName, category, subCategory } = formValues;

  const [products, setProducts] = useState([]);

  const { data } = useContext(AuthContext);

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

  const navigate = useNavigate();

  const handleClickDetail = (product) => {
    navigate(`/customer/product_detail`, { state: { product } });
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

  return (
    <>
      <CustomerNavBar />
      <div className="container mt-5">
        <div className="card rounded shadow">
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
              paddingLeft: "490px",
              fontSize: "30px",
              fontWeight: "bold",
              paddingTop: "10px",
            }}
            htmlFor=""
          >
            Productos Disponibles
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
                          Detalles
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
                            <td>{product.size}</td>
                            <td>{product.unitPrice}</td>
                            <td>
                              <button
                                className="btn btn-success"
                                onClick={() => handleClickDetail(product)}
                              >
                                Ver
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
