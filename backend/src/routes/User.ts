import { Router } from "express";
import {getUsers, GetUser} from "../controllers/Users";


const router = Router();

router.get("/", getUsers);
router.get("/:id",GetUser)
export default  router