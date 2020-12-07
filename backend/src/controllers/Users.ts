import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import {User} from "../entity/User";
import config from "../config/AppConfig.json"

export const getUsers = async (req:Request, res:Response) =>{

    const userRepository = getRepository(User);

    let usersToSend:any [];
    try {
        const users = await userRepository.find({relations: ["projectUser"]});
        usersToSend = users.map(user =>{
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                projects: user.projectUser.length,
                status: user.isRemove ? "inactive" : "active",
            }
        })

    } catch (error) {
        res.status(404).send();
        return
    }
    res.send(usersToSend)

}

export const getUser = async (req:Request, res:Response) =>{
    const id = req.params.id
    const userRepository = getRepository(User);


    try{

        const user = await  userRepository.findOne({relations:["projectUser","projectUser.project"],where:{username:id}});
        if(!user){
            res.status(404).send();
            return
        }

        const projects = user.projectUser
            .filter(item => !item.isRemove)
            .map(item =>{
                return{
                    name: item.project.name,
                    id: item.project.id,
                    isActive:item.isActive
                }
            })

        const data ={
            firstName: user.firstName,
            lastName: user.lastName,
            projects: projects,
            status: user.isRemove ? "inactive" : "active",
            email: user.email,
            username: user.username,
            phoneNumber: user.phoneNumber,
            isAdmin: user.isAdmin
        }
        res.send(data)
        return
    } catch (e) {
        res.status(404).send();
        return
    }
}

export const updateUser = async (req:Request, res:Response) =>{
    const id = req.params.id
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({where:{username:id}})
    if(!user){
        res.status(404).send();
        return
    }
    const token = req.header('authorization')?.slice(7)
    let decodeToken:null|any = null
    if(token)
        decodeToken = jwt.decode(token);
    const {phoneNumber,firstName,lastName,isAdmin,email,password} = req.body.user;
    if(firstName){
        user.firstName = firstName
    }
    if(phoneNumber){
        user.phoneNumber = phoneNumber
    }
    if(lastName){
        user.lastName = lastName
    }
    if(email){
        user.email = email
    }
    if(password){
        user.password = password
    }
    if(decodeToken) {
        if (isAdmin != undefined && decodeToken.isAdmin) {
            user.isAdmin = isAdmin
        }
    }
    try{
        await userRepository.save(user)
        res.status(204).send();
        return
    }catch (e) {
        res.status(500).send({error: e});
        return
    }
}