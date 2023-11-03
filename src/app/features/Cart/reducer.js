import { ADD_ITEM, CLEAR_ITEM, DECREMENT_ITEM, REFRESH_ITEM } from "./constant";

const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

export default function cartReducer(state = initialState, { type, payload}){
    switch (type) {
        case ADD_ITEM:
            if(state.find(item => item._id === payload.item._id)){
                return state.map(item => ({...item, qty: item._id === payload.item._id ? item.qty + 1  : item.qty}));
            }else{
                return [...state, {...payload.item, qty: 1}]
            }
        case DECREMENT_ITEM:
            return state.map(item => ({...item, qty: item._id === payload.item._id ? item.qty - 1  : item.qty}))
            .filter(item=>item.qty > 0);
        case CLEAR_ITEM:
            return []
        case REFRESH_ITEM:
            return payload;
        default: 
        return state
    }
}