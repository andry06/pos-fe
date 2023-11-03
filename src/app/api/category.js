import * as config from '../config';
import axios from "axios";

export const apiGetCategory = async() => {

    return await axios.get(`${config.urlAPI}/api/categories`)
}

export const apiPostCategory = async(data) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${config.urlAPI}/api/categories`, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const apiPutCategory = async(id, data) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${config.urlAPI}/api/categories/${id}`, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const apiDeleteCategory = async(id) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.delete(`${config.urlAPI}/api/categories/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}