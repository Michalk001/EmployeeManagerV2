import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import {User} from "../entity/User";



export const deleteUser = async (req:Request, res:Response) =>{
    const id = req.params.id
    const userRepository = await getRepository(User)
    const user = await userRepository.findOne({where:{username:id}, relations:['projectUser','projectUser.project']})
    if(!user){
        res.status(404).end()
        return
    }
    user.isActive = false
    user.isRemove = true
    user.projectUser.forEach(item =>{
        item.isActive = false
        item.isRemove = true
    })
    try{
        await userRepository.save(user)
        res.status(200).end()
        return
    }
    catch (e) {
        res.status(400).end()
    }
}


export const getUsers = async (req:Request, res:Response) =>{

    const userRepository = getRepository(User);

    let usersToSend:any [];
    try {
        const users = await userRepository.find({relations: ["projectUser"],where:{isRemove:false}});
        usersToSend = users
            .map(user =>{
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                projects: user.projectUser.filter(item => !item.isRemove).length,
                isActive: user.isActive
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

        const user = await  userRepository.findOne({relations:["projectUser","projectUser.project"],where:{username:id, isRemove:false}});
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
                    isActive:item.isActive,
                    projectUserID: item.id
                }
            })

        const data ={
            firstName: user.firstName,
            lastName: user.lastName,
            projects: projects,
            isActive: user.isActive,
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
    const user = await userRepository.findOne({where:{username:id,isRemove:false}, relations:['projectUser','projectUser.project']})
    if(!user){
        res.status(404).send();
        return
    }
    const token = req.header('authorization')?.slice(7)
    let decodeToken:null|any = null
    if(token)
        decodeToken = jwt.decode(token);
    const {phoneNumber,firstName,lastName,isAdmin,email,password,isActive} = req.body.user;
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
    if(isActive != undefined){
        user.isActive = isActive
        if(!isActive){
            user.projectUser.forEach(item =>{
                item.isActive = false
            })
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