import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useForm } from "../..//hooks/useForm";
import { SwalAlert } from "../../components/alerts/SwalAlert";
import { AdminNavBar } from "../../components/navbar/AdminNavBar";
import { getCategories } from "../../services/category";
import { addProductService,addPhoto} from "../../services/product";
import { getSubCategories } from "../../services/subCategory";
import { useNavigate } from "react-router-dom";

export const AddProducts = () => {
  const inputFile = useRef(null);
  const [file, setFile] = useState({});
  const [listado, setList] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const { data } = useContext(AuthContext);

  const navigate = useNavigate();

  const [formValues, handleInputChange, reset] = useForm({
    name: "",
    brand: "",
    description: "",
    image: "",
    stock: 0,
    unitPrice: 0,
    size: "",
    category: null,
    subCategory: null,
  });

  const {
    name,
    brand,
    description,
    image,
    stock,
    unitPrice,
    size,
    category,
    subCategory,
  } = formValues;

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (inputFile.current.value === "") {
      SwalAlert("error", "Seleccione un archivo");
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

    

    const response = await addPhoto(formData);
    const productResponse = await addProductService(name, brand, description, file.archivo.name, stock, unitPrice, size, {id: category, name: ""}, {id: subCategory, name: ""});
    console.log(productResponse.msg);
    if (!response.error && !productResponse.error) {
      reset();
      setFile({});
      inputFile.current.value = null;
      SwalAlert("success", productResponse.msg);
    } else {
      setTimeout(() => {
        SwalAlert("error", productResponse.msg);
      }, 500);
    }
  };

  useEffect(() => {
    async function getCatSub() {
      const arrayOfCategories = [];
      const arrayOfSubCategories = [];
      const listOfCategories = await getCategories(data.data.token);
      const listOfSubCategories = await getSubCategories(data.data.token);
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
  }, [data.data.token]);

  return (
    <>
      <AdminNavBar />
      <div className="container mt-5">
        <div className="card rounded shadow">
          <div className="card-header">
          <button
            className="btn"
            style={{ backgroundColor: "#3aacb0", color: "white", width: "150px", marginLeft: "1100px",marginTop: "20px" }}
            onClick={() => navigate("/admin/inventory")}
          >
            Volver al Inicio
          </button>
            <h1>Añadir productos</h1>
          </div>
          <div className="card-body">
            <form onSubmit={handleAddProduct}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  value={name}
                  name="name"
                  className="form-control"
                  placeholder="Nombre"
                  onChange={handleInputChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Marca</label>
                <input
                  type="text"
                  value={brand}
                  name="brand"
                  placeholder="Marca"
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
                  placeholder="Descripción"
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
                  placeholder="Cantidad"
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
                  placeholder="Precio por unidad"
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
                  placeholder="Talla"
                  name="size"
                  className="form-control"
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Imagen</label>
                <input
                  style={{backgroundColor:"#3aacb0",color:"white"}}
                  type="file"
                  onChange={(e) =>
                    setFile({ ...file, archivo: e.target.files[0] })
                  }
                  ref={inputFile}
                  className="form-control"
                />
              </div>

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

              <button type="submit" className="btn mt-3" style={{backgroundColor:"#3aacb0",color:"white"}}>
                Añadir producto
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
