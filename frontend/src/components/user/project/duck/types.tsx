export interface IProjectProfile {
    name:string,
    description:string,
    isActive:boolean,
    users:IProjectUserProfile[];
}

export interface IProjectEditor {
    name:string,
    description:string,
    isActive:boolean,
    users:IProjectUserProfile[];
}

export interface IProjectUserProfile {
    firstName:string,
    lastName:string,
    username:string,
    isActive:boolean
    id:string
    projectUserID:string
}