import {PasswordErrorType} from "./types";

import policy from "../policy.json"

export const Password = (password:string,username:string):PasswordErrorType[]|null =>{
    let errorList:PasswordErrorType[] = [];
    if(password.toUpperCase() === username.toUpperCase() && policy.PASSWORD.DIFFERENT_USERNAME){
        errorList.push(PasswordErrorType.DIFFERENT_USERNAME)
    }
    if(!/\d/.test(password) && policy.PASSWORD.LEAST_ONE_NUMBER){
        errorList.push(PasswordErrorType.LEAST_ONE_NUMBER)
    }
    if(password.length < policy.PASSWORD.LEAST_LENGTH){
        errorList.push(PasswordErrorType.LEAST_LENGTH)
    }
    if(!/[A-Z]/.test(password) && policy.PASSWORD.LEAST_ONE_UPPERCASE){
        errorList.push(PasswordErrorType.LEAST_ONE_UPPERCASE)
    }
    if(!/[a-z]/.test(password) && policy.PASSWORD.LEAST_ONE_LOWERCASE){
        errorList.push(PasswordErrorType.LEAST_ONE_LOWERCASE)
    }
    if(errorList.length > 0)
        return errorList;
    return null
}