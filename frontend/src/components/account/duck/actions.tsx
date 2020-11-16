import {userData, userTypes} from "./types";


export interface AccountState {
    userData: userData | null,
}

export interface ISetUser {
    type: userTypes.SET_USER_DATA;
    payload: userData
}

export interface ILogoutUser {
    type: userTypes.LOGOUT_USER;
}

export type AccountActionTypes = ISetUser | ILogoutUser;


export const setUserData = ( userData: userData):ISetUser =>({
    type: userTypes.SET_USER_DATA,
    payload: userData
})

export const logoutUser = ():ILogoutUser => ({
    type: userTypes.LOGOUT_USER
})