import axios from "axios";
//const BaseUrl = 'http://localhost:4000/api';
const BaseUrl = "http://localhost:8080/v1";

/*export const login = async (email, password) => {
  const response = await axios.post(`${BaseUrl}/auth/login`, {
    email,
    password,
  });
  return response.data;
};*/

export const login = async (email, password) => {
  const response = await fetch(`${BaseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  return data;
};

export const signUp = async (
  id,
  password,
  firstName,
  lastName,
  email,
  phoneNumber
) => {
  const response = await fetch(`${BaseUrl}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
    }),
  });
  const data = await response.json();
  return data;
};

export const UpdateUserInfo = async (
  id,
  password,
  firstName,
  lastName,
  email,
  phoneNumber
) => {
  const response = await fetch(`${BaseUrl}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      password,
      firstName,
      lastName,
      email,
      phoneNumber,
    }),
  });
  const data = await response.json();
  return data;
};

export const getUserBills = async (id) => {
  const response = await fetch(`${BaseUrl}/users/bills/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};
