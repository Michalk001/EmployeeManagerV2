export interface IProjectProfile {
    name:string,
    description:string,
    isRemove:boolean,
    users:IProjectUserProfile[];
}

export interface IProjectUserProfile {
    firstName:string,
    lastName:string,
    username:string,
    isRemove:boolean
}