import axios from "axios";
//const BaseUrl = 'http://localhost:4000/api';
const BaseUrl = "http://localhost:8080/v1";

export const getPaymentMethods = async () => {
    const response = await fetch(`${BaseUrl}/payment_methods`);
    const data = await response.json();
    return data;
  };