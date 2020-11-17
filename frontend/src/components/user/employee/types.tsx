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