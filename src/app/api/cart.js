import * as config from '../config';
import axios from "axios";

export const apiSaveCart = async(cart) => {
   const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

    return await axios.put(`${config.urlAPI}/api/carts`, {items: cart} , {
       headers: {
           authorization: `Bearer ${token}`
        }
    })
}

export const apiGetCart = async() => {
  const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

   return await axios.get(`${config.urlAPI}/api/carts`, {
      headers: {
          authorization: `Bearer ${token}`
       }
   })
}

export const apiGetCartProduct = async(products) => {
   const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
 
    return await axios.get(`${config.urlAPI}/api/carts?products=${products}`, {
       headers: {
           authorization: `Bearer ${token}`
        }
    })
 }

export const apiDeleteCart = async() => {
   const { token } = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};
 
    return await axios.delete(`${config.urlAPI}/api/carts`,  {
       headers: {
           authorization: `Bearer ${token}`
        }
    })
 }