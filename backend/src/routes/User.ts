import { Router } from "express";
import {getUsers, getUser, updateUser} from "../controllers/Users";


const router = Router();

router.get("/", getUsers);
router.get("/:id",getUser)
router.put("/:id/",updateUser)
export default  router