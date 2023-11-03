import { SET_CATEGORY, SET_PAGE, SET_SEARCH, SET_TAGS, SET_TOTAL_ITEM } from "./constants"

const initialState = {
    category: '',
    search: '',
    tags: [],
    currentPage: 0,
    limitPage: 8,
    totalItem: 0
}

export default function productReducer(state=initialState, {type, payload}){

    switch(type){
        case SET_CATEGORY:
            return { ...state, category: payload, currentPage: 0 }
        case SET_SEARCH:
            return { ...state, search: payload, currentPage: 0 }
        case SET_TAGS:
            return { ...state, tags: payload, currentPage: 0 }
        case SET_PAGE:
            return { ...state, currentPage: payload }
        case SET_TOTAL_ITEM:
            return { ...state, totalItem: payload }
        default:
            return state
    }
}