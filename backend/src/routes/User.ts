import { Router } from "express";
import {getUsers} from "../controllers/Users";


const router = Router();

router.get("/", getUsers);
export default  router