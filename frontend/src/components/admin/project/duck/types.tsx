

export interface IProjectNew {

    name:string,
    description:string,
    users:string[]
}

export interface IUser {
    firstName:string,
    lastName:string,
    username:string,
}

export interface IProjectList {
    name:string,
    employee:number,
    isActive:boolean,
    id:string
}

export interface IResultProjectUser {
    id:string,
    hour:number,
    isActive: boolean,
    isRemove: boolean
    user:IUser
}