import {saveProject,getProjects, getProject,updateProject,deleteProject} from '../controllers/Project'
import {Router} from "express";


const router = Router();
router.post("/", saveProject);
router.get("/",getProjects)
router.get("/:id",getProject)
router.put("/:id",updateProject)
router.delete("/:id",deleteProject)
export default router