import {saveProject,getProjects, getProject} from '../controllers/Project'
import {Router} from "express";


const router = Router();
router.post("/", saveProject);
router.get("/",getProjects)
router.get("/:id",getProject)
export default router