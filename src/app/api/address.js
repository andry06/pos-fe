import * as config from '../config';
import axios from "axios";

export const apiGetAddress = async() => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.get(`${config.urlAPI}/api/delivery-addresses`,  {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const apiPostAddress = async(data) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${config.urlAPI}/api/delivery-addresses`, data, {
        headers: {
            'authorization': `Bearer ${token}`
        }
    })
}

export const apiPutAddress = async(id, data) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${config.urlAPI}/api/delivery-addresses/${id}`, data, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const apiDeleteAddress = async(id) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.delete(`${config.urlAPI}/api/delivery-addresses/${id}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
}

export const apiGetRegionIndonesia = async(param) => {
   
    return await axios.get(`https://www.emsifa.com/api-wilayah-indonesia/api/${param}.json`)
}