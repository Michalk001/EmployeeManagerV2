export enum userTypes {
    SET_USER_DATA = "SET_USER_DATA",
    REGISTER = "REGISTER",
    LOGOUT_USER = "LOGOUT_USER"
}

export interface userData{
    username:string
    firstName:string
    lastName:string
    id:string
    token: string
}

export interface jwtTokenData{
    userId: string,
    firstName: string
    lastName: string
    username: string
    iat: number
    exp: number
}