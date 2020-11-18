export enum userTypes {
    SET_USER_DATA = "SET_USER_DATA",
    LOGOUT_USER = "LOGOUT_USER"
}

export interface userData{
    username:string
    firstName:string
    lastName:string
    isAdmin:boolean
    id:string
    token: string
}

export interface jwtTokenData{
    userId: string,
    firstName: string
    lastName: string
    username: string
    isAdmin:boolean
    iat: number
    exp: number
}