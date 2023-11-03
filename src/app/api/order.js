import * as config from '../config';
import axios from "axios";

export const apiCreateOrder = async(payload) => {
   const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.post(`${config.urlAPI}/api/orders`, payload , {
       headers: {
           authorization: `Bearer ${token}`
        }
    })
}

export const apiGetOrder = async() => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
 
     return await axios.get(`${config.urlAPI}/api/orders`, {
        headers: {
            authorization: `Bearer ${token}`
         }
     })
 }

 export const apiGetInvoiceByOrderId = async(order_id) => {
    const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
 
     return await axios.get(`${config.urlAPI}/api/invoices/${order_id}`, {
        headers: {
            authorization: `Bearer ${token}`
         }
     })
 }