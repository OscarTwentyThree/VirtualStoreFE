import axios from "axios";
//const BaseUrl = 'http://localhost:4000/api';
const BaseUrl = "http://localhost:8080/v1";

export const addPhoto = async (formData) => {
  try {
    const response = await axios.post(`${BaseUrl}/products/images`, formData, {
      header: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const addProductService = async (
  name,
  brand,
  description,
  image,
  stock,
  unitPrice,
  size,
  category,
  subCategory
) => {
  const response = await fetch(`${BaseUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      brand,
      description,
      image,
      stock,
      unitPrice,
      size,
      category,
      subCategory,
    }),
  });
  const data = await response.json();
  return data;
};

export const UpdateProduct = async (
  id,
  name,
  brand,
  description,
  image,
  stock,
  unitPrice,
  size,
  category,
  subCategory
) => {
  const response = await fetch(`${BaseUrl}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
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
    }),
  });
  const data = await response.json();
  return data;
};

export const deleteProduct = async (
  id,
) => {
  const response = await fetch(`${BaseUrl}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

export const getProducts = async () => {
  const response = await fetch(`${BaseUrl}/products`);
  const data = await response.json();
  return data;
};

export const getProductById = async (id) => {
  const response = await fetch(`${BaseUrl}/products/${id}`);
  const data = await response.json();
  return data;
};
