import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import {User} from "../entity/User";


export const getUsers = async (req:Request, res:Response) =>{

    const userRepository = getRepository(User);

    let usersToSend:any [];
    try {
        const users = await userRepository.find({relations: ["projects"]});
        usersToSend = users.map(user =>{
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                projects: user.projects.length,
                status: user.isRemove ? "inactive" : "active",
            }
        })

    } catch (error) {
        res.status(401).send();
        return
    }
    res.send(usersToSend)

}

export const getUser = async (req:Request, res:Response) =>{
    const id = req.params.id
    const userRepository = getRepository(User);

    try{
        const user = await  userRepository.findOne({relations:["projects"],where:{username:id}});
        if(!user){
            res.status(404).send();
            return
        }
        const projects = user.projects.map(item =>{
            return{
                name: item.name,
                id: item.id,
                isRemove:item.isRemove
            }
        })
        const userToSend ={
            firstName: user.firstName,
            lastName: user.lastName,
            projects: projects,
            status: user.isRemove ? "inactive" : "active",
            email: user.email
        }
        res.send(userToSend)
        return
    } catch (e) {
        res.status(401).send();
        return
    }
}