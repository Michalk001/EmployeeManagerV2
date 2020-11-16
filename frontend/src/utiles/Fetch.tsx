
import Cookies from "js-cookie";

export enum Method{
    POST="post",
    GET="get"
}



export const  FetchGet = async (url:string) =>{
    return await fetch(url, {
        method: "get",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': 'Bearer ' + Cookies.get('token'),
        },

    });
}

export const Fetch = async (url:string, method:Method, body:any) =>{
    if(method === Method.GET){
        return FetchGet(url)
    }
    return await fetch(url, {
        method: method,
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': 'Bearer ' + Cookies.get('token'),
        },
        body: JSON.stringify(body)
    });
}