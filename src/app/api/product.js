import * as config from '../config';
import axios from "axios";

export const apiPostProduct = async(data) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
  
    return await axios.post(`${config.urlAPI}/api/products`, data, {
        headers: {
            'authorization': `Bearer ${token}`, 
            'content-type': 'multipart/form-data'
        }
    })
}

export const apiGetProduct = async(query) => {
    return await axios.get(`${config.urlAPI}/api/products?${query}`)
}