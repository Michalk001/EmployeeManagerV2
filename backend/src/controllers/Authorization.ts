import {Request, Response} from "express";
import * as jwt from "jsonwebtoken";
import {getRepository, Like} from "typeorm";
import {User} from "../entity/User";
import * as bcrypt from "bcryptjs";
import AppConfig from "../config/AppConfig.json"

export const hashPassword = (password:string) => {
    return bcrypt.hashSync(password, 8)
}


interface IChangePassword {
    oldPassword:string,
    newPassword:string,
    repeatNewPassword:string
}

export const Login = async  (req:Request, res:Response) =>{
    const { username, password } = req.body.user;
    if (!(username && password)) {
        res.status(400).send();
    }

    const userRepository = getRepository(User);
    let user: User;
    try {
        user = await userRepository.findOneOrFail({ where: { username: Like(username.trim()) } });
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

    const { username, password,firstName, lastName, email, isAdmin, phoneNumber } = req.body.user as User;
    const user = new User();
    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;
    user.password = hashPassword(password);
    user.email = email;
    user.isAdmin = isAdmin
    user.phoneNumber = phoneNumber
    const userRepository = getRepository(User);
    try {
        await userRepository.save(user);
    } catch (e) {
        res.status(409).send("username already in use");
        return;
    }

    res.status(201).send("User created");
}

export const ChangePassword = async (req:Request, res:Response) => {
    const id = req.params.id
    const {oldPassword,newPassword,repeatNewPassword} =  req.body as IChangePassword

    if (!(oldPassword && newPassword && repeatNewPassword )) {
        res.status(400).end();
        return;
    }
    if (newPassword !== repeatNewPassword) {
        res.status(400).end();
        return;
    }

    const userRepository = await getRepository(User)
    const user = await userRepository.findOne({where:{username:id}})
    if(!user){
        res.status(404).end();
        return;
    }

    if (!bcrypt.compareSync(oldPassword, user.password)) {
        res.status(400).end();
        return
    }

    user.password = hashPassword(newPassword)

    try{
        await userRepository.save(user)
        res.status(200).end()
    }
    catch (e) {
        console.log(e)
        res.status(400).end()
    }


}