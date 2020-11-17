
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import {User} from "../entity/User";
import * as bcrypt from "bcryptjs";
import AppConfig from "../config/AppConfig.json"

const hashPassword = (password:string) => {
    return bcrypt.hashSync(password, 8)
}


export const Login = async  (req:Request, res:Response) =>{
    const { username, password } = req.body.user;
    if (!(username && password)) {
        res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
        user = await userRepository.findOneOrFail({ where: { username } });
    } catch (error) {
        res.status(401).send();
        res.end()
        return  
    }

    if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin},
            AppConfig.jwtSecret,
            {expiresIn: "1h"}
        );
        res.send({token: token});
    } else {
        res.status(401).send();
        return;
    }
}

export const Register = async (req: Request, res: Response) =>{

    const { username, password,firstName, lastName, email, isAdmin } = req.body.user;
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.password = hashPassword(password);
    user.email = email;
    user.isAdmin = isAdmin
    const userRepository = getRepository(User);
    try {
        await userRepository.save(user);
    } catch (e) {
        res.status(409).send("username already in use");
        return;
    }

    res.status(201).send("User created");
}