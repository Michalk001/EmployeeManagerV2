import config from  "../../../utiles/config.json"
import {Fetch, Method} from "../../../utiles/Fetch";
import {jwtTokenData, userData} from "./types";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";


export const fetchLogin = async (username:string,password:string) =>{

    const response = await Fetch(`${config.API_URL}/auth/login`,Method.POST,{user:{username,password}});
    return response
}


export const decodeUserToken = (token:string):userData =>{
    const decodedToken:jwtTokenData = jwt_decode(token);
    const user:userData = {
        lastName:decodedToken.lastName,
        firstName:decodedToken.firstName,
        username:decodedToken.username,
        id: decodedToken.userId,
        token: token
    }

    return user
}

export const saveTokenToCookies = (token:string) =>{
    const decodedToken:jwtTokenData = jwt_decode(token);
    Cookies.set('token', token, {expires: decodedToken.exp});
}

export const loadTokenFromCookies = ():string|null =>{
   const token = Cookies.get('token')
    if(token) return token
    return null
}

export const logout = () =>{
   Cookies.remove("token");
}