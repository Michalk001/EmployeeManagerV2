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

export interface IProjectUpdate {
    name?: string,
    description?:string
    isActive?:boolean
}

export const deleteProject = async (req:Request, res:Response) =>{
    const id = req.params.id
    const projectRepository = await getRepository(Project)
    const project = await projectRepository.findOne({where:{id}, relations:['projectUser','projectUser.user']})
    if(!project){
        res.status(404).end()
        return
    }
    project.isActive = false
    project.isRemove = true
    project.projectUser.forEach(item =>{
        item.isActive = false
        item.isRemove = true
    })
    try{
        await projectRepository.save(project)
        res.status(200).end()
        return
    }
    catch (e) {
        res.status(400).end()
    }
}

export const updateProject = async (req:Request,res:Response) =>{
    const id = req.params.id

    const {name, description, isActive} = req.body.project as IProjectUpdate
    if(name && name.trim() .length=== 0){
        res.status(400).end()
        return
    }

    const projectRepository = await getRepository(Project)
    const project = await projectRepository.findOne({where:{id}, relations:['projectUser','projectUser.user']})
    if(!project){
        res.status(404).end()
        return
    }
    if(name){
        project.name = name
    }
    if(description){
        project.description = description
    }
    if(isActive != undefined){
        project.isActive = isActive
        if(!isActive)
            project.projectUser.forEach(item =>{
                item.isActive = false
            })
    }
    try{
        await projectRepository.save(project)
        res.status(200).end()
        return
    }
    catch (e) {
        console.log(e)
        res.status(400).end()
    }

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
    
    try {
        await projectRepository.save(project)
        if(users.length !== 0){
            try {
                const usersTmp = (await Promise.all(users.map(async (user) => {
                    return await userRepository.findOne({where: {username: user}})
                })))
                    .filter((item): item is User => item !== undefined);
                await Promise.all(usersTmp.map( async item =>{
                    await projectUserRepository.save({
                        user: item,
                        project: project,
                        hour: 0,
                        isActive: true,
                        isRemove: false
                    })

                }))

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
                    employee: project.projectUser.filter(item => !item.isRemove).length,
                    isActive: project.isActive
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
        const project = await  projectRepository.findOne({ relations:["projectUser", "projectUser.user"] ,where:{id:id,isRemove:false}})

        if(!project){
            res.status(404).send();
            return
        }
        const users = project.projectUser
            .filter(item => !item.isRemove)
            .map(item =>{
            return{
                firstName: item.user.firstName,
                lastName: item.user.lastName,
                username: item.user.username,
                isActive: item.isActive,
                projectUserID: item.id
            }
        })

        const data ={
            users,
            name: project.name,
            description: project.description,
            isActive: project.isActive

        }
        res.send(data)
        return
    } catch (e) {
        res.status(401).send();
        return
    }
    
}