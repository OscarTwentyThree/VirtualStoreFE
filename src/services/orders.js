import axios from "axios";
//const BaseUrl = 'http://localhost:4000/api';
const BaseUrl = "http://localhost:8080/v1";

export const getOrders = async () => {
    const response = await fetch(`${BaseUrl}/orders`);
    const data = await response.json();
    return data;
};