import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useForm } from "../..//hooks/useForm";
import { SwalAlert } from "../../components/alerts/SwalAlert";
import { AdminNavBar } from "../../components/navbar/AdminNavBar";
import { getCategories } from "../../services/category";
import { UpdateProduct, addPhoto } from "../../services/product";
import { getSubCategories } from "../../services/subCategory";
import { useNavigate, useLocation } from "react-router-dom";

export const EditProduct = () => {
  const inputFile = useRef(null);
  const [file, setFile] = useState({});
  const [listado, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [error, setError] = useState(false);
  const [errorImg, setErrorImg] = useState(false);

  const location = useLocation();

  const { data } = useContext(AuthContext);

  const product = location.state.product;

  const navigate = useNavigate();

  const [formValues, handleInputChange, reset] = useForm({
    id: product.id,
    name: product.name,
    brand: product.brand,
    description: product.description,
    image: product.image,
    stock: product.stock,
    unitPrice: product.unitPrice,
    size: product.size,
    category: product.category.id,
    subCategory: product.subCategory.id,
    option: "No",
  });

  const {
    id,
    name,
    brand,
    description,
    image,
    stock,
    unitPrice,
    size,
    category,
    subCategory,
    option,
  } = formValues;

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (inputFile.current.value === "" && option == "Si") {
      SwalAlert("error", "Seleccione un archivo para la imagen");
      return;
    }

    const formData = new FormData();
    formData.append("file", file.archivo);
    if (category === null || subCategory === null) {
      SwalAlert("error", "Seleccione una categoria ");
      return;
    }

    if (description === "") {
      SwalAlert("error", "Ingrese una descripción");
      return;
    }

    if (option == "Si") {
      let imageName = "/images/" + file.archivo.name;
      const response = await addPhoto(formData);
      const { error } = await UpdateProduct(
        id,
        name,
        brand,
        description,
        imageName,
        stock,
        unitPrice,
        size,
        { id: category, name: "" },
        { id: subCategory, name: "" }
      );
      setError(error);
    }
    if (option == "No") {
      //let imageName = image.split("/");
      const productResponse = await UpdateProduct(
        id,
        name,
        brand,
        description,
        image,
        stock,
        unitPrice,
        size,
        { id: category, name: "" },
        { id: subCategory, name: "" }
      );
      setError(error);
    }
    if (!error) {
      reset();
      setFile({});
      inputFile.current.value = null;
      SwalAlert("success", "Producto actualizado correctamente");
    } else {
      setTimeout(() => {
        SwalAlert("error", "Error al actualizar producto");
      }, 500);
    }
  };

  console.log(formValues);

  useEffect(() => {
    async function getCatSub() {
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
    getCatSub();
  }, []);

  const displayImageOptions = () => {
    if (option == "Si") {
      return (
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            style={{ backgroundColor: "#3aacb0", color: "white" }}
            type="file"
            onChange={(e) => setFile({ ...file, archivo: e.target.files[0] })}
            ref={inputFile}
            className="form-control"
          />
        </div>
      );
    } else {
      return (
        <div className="mb-3">
          <label className="form-label">Imagen</label>
          <input
            style={{ backgroundColor: "lightgray", color: "white" }}
            type="file"
            onChange={(e) => setFile({ ...file, archivo: e.target.files[0] })}
            ref={inputFile}
            className="form-control"
            disabled
          />
        </div>
      );
    }
  };

  return (
    <>
      <AdminNavBar />
      <div className="container mt-5">
        <div className="card rounded shadow">
          <div className="card-header">
            <button
              className="btn"
              style={{
                backgroundColor: "#3aacb0",
                color: "white",
                width: "150px",
                marginLeft: "1100px",
                marginTop: "20px",
              }}
              onClick={() => navigate("/admin/inventory")}
            >
              Volver al Inicio
            </button>
            <h1>Editar producto</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-3">
                <label className="form-label">Id del producto</label>
                <input
                  type="text"
                  value={id}
                  name="id"
                  className="form-control"
                  onChange={handleInputChange}
                  disabled
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  value={name}
                  name="name"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Marca</label>
                <input
                  type="text"
                  value={brand}
                  name="brand"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <input
                  type="text"
                  value={description}
                  name="description"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Cantidad</label>
                <input
                  type="number"
                  value={stock}
                  name="stock"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Precio por unidad</label>
                <input
                  type="number"
                  step="0.01"
                  value={unitPrice}
                  name="unitPrice"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Talla</label>
                <input
                  type="text"
                  value={size}
                  name="size"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4" value={option} onChange={handleInputChange}>
                <input type="radio" value="Si" name="option" /> Cambiar imagen
                <br />
                <input type="radio" value="No" name="option" /> Conservar imagen
              </div>
              {displayImageOptions()}
              <div className="mb-3">
                <label className="form-label">Categoría</label>
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

              <div className="mb-3">
                <label className="form-label">Sub-Categoría</label>
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

              <button
                type="submit"
                className="btn mt-3"
                style={{ backgroundColor: "#3aacb0", color: "white" }}
              >
                Actualizar
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
