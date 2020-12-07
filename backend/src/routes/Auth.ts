import { Router } from "express";
import {Login,Register,ChangePassword} from "../controllers/Authorization";

const router = Router();

router.post("/login", Login);
router.post("/register", Register);
router.put("/changePassword/:id", ChangePassword);

export default  router