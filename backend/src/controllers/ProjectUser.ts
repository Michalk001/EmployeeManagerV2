import { getRepository } from "typeorm";
import {Request, Response} from "express";
import {ProjectUser} from "../entity/ProjectUser";
import {User} from "../entity/User";
import {Project} from "../entity/Project";

interface IUpdate {
    newHours?: number,
    isActive?: boolean,
}

interface IUserProject {
    userID?: string,
    projectID?: string
}

export const addUserToProject = async (req:Request, res:Response) =>{

    const { userID,projectID } = req.body as IUserProject;
    if(!userID || !projectID){

        res.status(400).end();
        return
    }

    const projectUserRepository = getRepository(ProjectUser)
    const userRepository  = getRepository(User)
    const projectRepository  = getRepository(Project)
    const user = await userRepository.findOne({where:{username:userID}})
    const project = await projectRepository.findOne({where:{id:projectID}})

    const exists = await projectUserRepository.findOne({where:{user:user,project:project,isRemove: false}, relations:['user','project']})
    if(exists){
        res.status(404).end();
        return;
    }
    if(!user || !project){
        res.status(404).end();
        return;
    }
    try {
      const result = await projectUserRepository.save({
            project:project,
            user:user
        })
        res.status(201).send(result).end()
        return
    }
    catch (e) {

        res.status(400).end();
        return
    }


}

export const removeProjectUser = async (req:Request, res:Response) =>{

    const id = req.params.id
    const projectUserRepository = getRepository(ProjectUser)
    const projectUser = await projectUserRepository.findOne({where:{id}, relations:['user','project']} )
    if(!projectUser){
        res.status(404).end()
        return
    }
    projectUser.isRemove = true;
    await projectUserRepository.save(projectUser)
    res.status(204).end()
}

export const updateProjectUser = async  (req:Request, res:Response) =>{

    const id = req.params.id

    const projectUserRepository = getRepository(ProjectUser)
    const projectUser = await projectUserRepository.findOne({where:{id}, relations:['user','project']})

    if(!projectUser){
        res.status(404).end()
        return
    }

    const { newHours,isActive } = req.body as IUpdate;
    console.log(newHours)
    if(isActive != undefined)
        projectUser.isActive = isActive
    if(newHours != undefined)
        projectUser.hour +=  + +newHours
    await projectUserRepository.save(projectUser)
    res.status(204).end()

}