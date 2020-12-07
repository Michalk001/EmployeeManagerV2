import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import {Request, Response} from "express";
import {Project} from "../entity/Project";
import {User} from "../entity/User";
import {ProjectUser} from "../entity/ProjectUser";

export interface IProjectNew {
    name:string,
    description:string,
    users:string[]
}

export const saveProject = async (req:Request, res:Response) =>{

    const { name, description, users } = req.body.project as IProjectNew;

    if (name.trim().length === 0 ) {
        res.status(404).send();
    }
    const projectRepository = getRepository(Project)
    const userRepository = getRepository(User)
    const projectUserRepository = getRepository(ProjectUser)
    let project= new Project();
    project.description = description;
    project.name = name;

    const projectUser:ProjectUser[] = [];


    try {
      const result =  await projectRepository.save(project)
        if(users.length !== 0){
            try {
                const usersTmp = (await Promise.all(users.map(async (user) => {
                    return await userRepository.findOne({where: {username: user}})
                })))
                    .filter((item): item is User => item !== undefined);
                usersTmp.forEach(item =>{

                    projectUser.push({
                        user: item,
                        project: project,
                        hour: 0,
                        isActive: true,
                        isRemove: false
                    })
                })
                await projectUserRepository.save(projectUser)
                res.status(201).send();
                return;
            }
            catch (e) {
                res.status(400).send();
                return;
            }
        }

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
        const projects = (await projectRepository.find({relations: ["projectUser","projectUser.user"]}))
            .filter(item => !item.isRemove)
            .map(project =>{
                return{
                    name:project.name,
                    id:project.id,
                    employee: project.projectUser.length,
                    status: project.isActive
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
        const project = await  projectRepository.findOne({ relations:["projectUser", "projectUser.user"] ,where:{id:id}})

        if(!project){
            res.status(404).send();
            return
        }
        console.log(project)
        const users = project.projectUser
            .filter(item => !item.isRemove)
            .map(item =>{
            return{
                firstName: item.user.firstName,
                lastName: item.user.lastName,
                username: item.user.username,
                isActive: item.user.isActive,
            }
        })

        const data ={
            users,
            name: project.name,
            description: project.description,
            isRemove: project.isRemove

        }
        res.send(data)
        return
    } catch (e) {
        res.status(401).send();
        return
    }



}