
export interface IUserNew {
    firstName:string,
    lastName:string,
    username:string,
    password:string,
    email:string
    isAdmin:boolean
}

export interface IUser {
    firstName:string,
    lastName:string,
    username:string,
    status:string
    projects:number
}

export interface IUserProfile {
    firstName:string,
    lastName:string,
    username:string,
    status:string,
    email:string
    projects:IUserProfileProject[]
}

interface IUserProfileProject {
    id:string,
    name:string,
    isRemove:boolean
}