import {getRepository} from "typeorm";
import {User} from "../entity/User";
import configInitUser from "../../configInitUser.json"
import {hashPassword} from "../controllers/Authorization";
export const InitNewDatabase = async () =>{
    const userRepository = getRepository(User);
    try {
        const users = await userRepository.find({relations: ["projects"]});
        if(users.length !== 0)
            return
        if(!configInitUser.users || configInitUser.users.length === 0){
            console.log(`[server]: Not Found User Init`)
        }
        configInitUser.users.map(async (item) => {
            try {
                const checkUser = await userRepository.findOne({where:{username:item.username}})
                if(!checkUser) {
                    const user = new User();
                    user.firstName = item.firstName;
                    user.lastName = item.lastName;
                    user.username = item.username;
                    user.password = hashPassword(item.password);
                    user.email = item.email;
                    user.isAdmin = item.isAdmin;
                    try {
                        await userRepository.save(user);
                        console.log(`[server]: Create New User ${item.firstName} ${item.lastName}: ${item.username}`)
                    } catch (e) {
                        console.log(`[server]: ERROR: ${e}`);
                        return;
                    }
                }
            else{
                    console.log(`[server]: Username ${item.username} is busy`)
                }
            } catch (e) {
                console.log(`[server]: ERROR: ${e}`);
                return;
            }
        })



    }
    catch (e) {
        console.log(`[server]: ERROR: ${e}`)
        return
    }

}