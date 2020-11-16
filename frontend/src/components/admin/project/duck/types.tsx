

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
    status:string
    id:string
}
