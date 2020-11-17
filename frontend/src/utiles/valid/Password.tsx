import {PasswordErrorType} from "./types";
import config from "../config.json"
export const Password = (password:string,username:string):PasswordErrorType[]|null =>{
    let errorList:PasswordErrorType[] = [];
    if(password.toUpperCase() === username.toUpperCase() && ){
        errorList.push(PasswordErrorType.DIFFERENT_USERNAME)
    }
   // if(/\D/.test(password))


    return null
}