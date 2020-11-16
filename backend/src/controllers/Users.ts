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
        res.end()
        return
    }
    res.send(usersToSend)

}