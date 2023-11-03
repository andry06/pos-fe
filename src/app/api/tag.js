import * as config from '../config';
import axios from "axios";

export const apiGetTag = async() => {

    return await axios.get(`${config.urlAPI}/api/tags`)
}

export const apiPostTag = async(data) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${config.urlAPI}/api/tags`, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const apiPutTag = async(id, data) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${config.urlAPI}/api/tags/${id}`, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const apiDeleteTag = async(id) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.delete(`${config.urlAPI}/api/tags/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}