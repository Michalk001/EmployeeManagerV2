import { Router } from "express";
import {removeProjectUser,updateProjectUser,addUserToProject} from "../controllers/ProjectUser";


const router = Router();

router.delete("/:id",removeProjectUser)
router.put("/:id/",updateProjectUser)
router.post('/',addUserToProject)
export default  router