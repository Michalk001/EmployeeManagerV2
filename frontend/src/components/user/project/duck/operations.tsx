import {Item} from "../../common";
import {IProjectUserProfile} from "./types";
import {AppRoute} from "../../../../routing/AppRoute.enum";

export const getUserOfItemList = (projectUsers:IProjectUserProfile[]) =>{
    const projectUserList:Item[] = projectUsers
        .map(user =>{ return{
            label: `${user.firstName} ${user.lastName}`,
            path: `${AppRoute.userProfile}`,
            id: user.username
        }})
    return projectUserList
}