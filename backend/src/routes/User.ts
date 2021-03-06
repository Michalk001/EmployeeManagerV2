import { Router } from "express";
import {getUsers, getUser, updateUser,deleteUser} from "../controllers/Users";


const router = Router();

router.get("/", getUsers);
router.get("/:id",getUser)
router.put("/:id",updateUser)
router.delete("/:id",deleteUser)
export default  router