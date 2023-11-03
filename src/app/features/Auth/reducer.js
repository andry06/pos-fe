import { USER_LOGIN, USER_LOGOUT } from './constants';

let initialState = localStorage.getItem('auth') ?  JSON.parse(localStorage.getItem('auth')) : { user: {role: null}, token: null};
// if(initialState){ 
   

    
export default function authReducer(state=initialState, {type, payload}){

    switch(type){
        case USER_LOGIN:
            return { user: payload.user, token:payload.token, role: payload.user.role }
        case USER_LOGOUT:
            return { user: {role: null}, token: null }
        default:
            return state
    }
}
