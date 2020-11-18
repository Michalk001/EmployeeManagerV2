import {FetchGet} from "../../../../utiles/Fetch";
import config from "../../../../utiles/config.json";
import {IUserProfile, IUserProfileProject} from "./types";
import {Item} from "../../common";
import {AppRoute} from "../../../../routing/AppRoute.enum";

export const getUser = async (id:string) =>{
    const res = await FetchGet(`${config.API_URL}/user/${id}`)
    const userTmp:IUserProfile = await res.json();
    return  userTmp
}

export const getProjectOfItemList = (projects:IUserProfileProject[]) =>{
    const projectList:Item[] = projects
        .map(project =>{ return{
            label: project.name,
            path: `${AppRoute.projectProfile}`,
            id: project.id
        }})
    return projectList
}