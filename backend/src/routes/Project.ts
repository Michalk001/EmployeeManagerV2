import {saveProject,getProjects} from '../controllers/Project'
import {Router} from "express";


const router = Router();
router.post("/", saveProject);
router.get("/",getProjects)
export default router