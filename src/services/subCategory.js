import axios from "axios";
//const BaseUrl = 'http://localhost:4000/api';
const BaseUrl = 'http://localhost:8080/v1';


export const getSubCategories = async() => {
    const response = await fetch(`${BaseUrl}/subcategories`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data;
}


