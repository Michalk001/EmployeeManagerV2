import {jwtTokenData, userData} from "./types";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export const decodeUserToken = (token:string):userData =>{
    const decodedToken:jwtTokenData = jwt_decode(token);
    return  {
        lastName:decodedToken.lastName,
        firstName:decodedToken.firstName,
        username:decodedToken.username,
        id: decodedToken.userId,
        token: token,
        isAdmin:decodedToken.isAdmin,
    }
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