export interface IUserProfile {
    firstName:string,
    lastName:string,
    username:string,
    status:string,
    email:string,
    isAdmin:boolean
    projects:IUserProfileProject[],
    phoneNumber?:string|null,
}



export interface IUserProfileProject {
    id:string,
    name:string,
    isRemove:boolean
}
