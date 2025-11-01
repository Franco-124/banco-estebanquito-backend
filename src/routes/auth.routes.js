import {Router} from "express";
import {authMethods } from "../controllers/auth.controller.js";
const router = Router();

router.post("/auth/registrar_usuario",
    authMethods.CreateUser);

router.post("/auth/login_usuario",
    authMethods.LoginUser);

export default router;