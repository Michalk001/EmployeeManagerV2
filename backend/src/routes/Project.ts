import {saveProject} from '../controllers/Project'
import {Router} from "express";


const router = Router();
router.post("/", saveProject);

export default router