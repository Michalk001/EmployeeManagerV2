import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import {Request, Response} from "express";
import {Project} from "../entity/Project";
import {User} from "../entity/User";

export interface IProjectNew {
    name:string,
    description:string,
    users:string[]
}

export const saveProject = async (req:Request, res:Response) =>{

    const { name, description, users } = req.body.project as IProjectNew;

    if (name.trim().length === 0 ) {
        res.status(400).send();
    }
    const projectRepository = getRepository(Project)
    const userRepository = getRepository(User)
    let project= new Project();
    project.description = description;
    project.name = name;
    if(users.length !== 0){
        try {
            project.users = (await Promise.all(users.map(async (user) => {
                return await userRepository.findOne({where: {username: user}})
            })))
                .filter((item): item is User => item !== undefined);
        }
        catch (e) {

        }
    }
    try {
        await projectRepository.save(project)
    }
    catch (e) {
        res.status(401).send();
        return;
    }
    res.status(201).send();
}

export const getProjects = async (req:Request, res:Response) => {
    const projectRepository = getRepository(Project)
    try{
        const projects = (await projectRepository.find({relations: ["users"]}))
            .map(project =>{
                return{
                    name:project.name,
                    id:project.id,
                    employee: project.users.length,
                    status: project.isRemove? "inactive" : "active",
                }
            });
        res.send(projects)
    }
    catch (e) {
        res.status(401).send();
        return
    }

}

export const getProject = async (req:Request, res:Response) =>{
    const id = req.params.id
    const projectRepository = getRepository(Project);
    try{
        const project = await  projectRepository.findOne({where:{id:id}, relations:["users"]})
        if(!project){
            res.status(404).send();
            return
        }
        const users = project.users.map(user =>{
            return{
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                isRemove: user.isRemove,
            }
        })
        const projectToSend ={
            users,
            name: project.name,
            description: project.description,
            isRemove: project.isRemove

        }
        res.send(projectToSend)
        return
    } catch (e) {
        res.status(401).send();
        return
    }



}