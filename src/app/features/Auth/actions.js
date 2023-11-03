import { USER_LOGIN, USER_LOGOUT } from './constants';

export const actUserLogin = (payload) => {
    return {
            type: USER_LOGIN,
            payload
    }
}

export const actUserLogout = () => {
    return {
            type: USER_LOGOUT
    }
}