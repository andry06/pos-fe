import * as config from '../config';
import axios from "axios";

export const apiLoginUser = async(data) => {
    return await axios.post(`${config.urlAPI}/auth/login`, data );
}

export const apiRegisterUser = async(data) => {
    return await axios.post(`${config.urlAPI}/auth/register`, data );
}

export const apiLogoutUser = async() => {
    let { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${config.urlAPI}/auth/logout`, null, {
        headers: {
            authorization: `Bearer ${token}`
        }
    })
   
}