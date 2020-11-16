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
