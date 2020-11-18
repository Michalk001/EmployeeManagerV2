import {EmailValidType} from "./types";

export const Email = (email:string):EmailValidType[]|null =>{
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const error:EmailValidType[] = []
    if(!re.test(email)){
        error.push(EmailValidType.INVALID_EMAIL)
    }
    if(error.length > 0)
        return error
    return null
}