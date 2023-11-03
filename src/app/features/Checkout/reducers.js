import { CHECKLIST_ITEM } from "./constants"

const initialState = {
    idProduct: []
}

export default function checkoutReducer(state=initialState, {type, payload}){

    switch(type){
        case CHECKLIST_ITEM:
            return { ...state, idProduct: payload }
        default:
            return state
    }
}