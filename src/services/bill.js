import axios from "axios";
//const BaseUrl = 'http://localhost:4000/api';
const BaseUrl = "http://localhost:8080/v1";

export const addShippingAddress = async (
  city,
  state,
  country,
  street,
  zipCode
) => {
  const response = await fetch(`${BaseUrl}/shipping_addresses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      city,
      state,
      country,
      street,
      zipCode,
    }),
  });
  const data = await response.json();
  return data;
};

export const AddBill = async (
  date,
  subtotal,
  total,
  tax,
  paymentMethod,
  shippingAddress,
  status,
  user
) => {
  const response = await fetch(`${BaseUrl}/bills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      date,
      subtotal,
      tax,
      total,
      paymentMethod,
      shippingAddress,
      status,
      user,
    }),
  });
  const data = await response.json();
  return data;
};

export const AddOrder = async (amount, quantity, product, bill) => {
  const response = await fetch(`${BaseUrl}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount,
      quantity,
      product,
      bill,
    }),
  });
  const data = await response.json();
  return data;
};

export const updateBill = async (
  id,
  total,
  subtotal,
  tax,
  date,
  user,
  paymentMethod,
  status,
  shippingAddress
) => {
  const response = await fetch(`${BaseUrl}/bills/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      total,
      subtotal,
      tax,
      date,
      user,
      paymentMethod,
      status,
      shippingAddress,
    }),
  });
  const data = await response.json();
  return data;
};

export const getBills = async () => {
  const response = await fetch(`${BaseUrl}/bills`);
  const data = await response.json();
  return data;
};
