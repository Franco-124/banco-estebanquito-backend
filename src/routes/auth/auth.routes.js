import {Router} from "express";
import {authMethods } from "../../controllers/auth/auth.controller.js";
const router = Router();

router.post("/registrar_usuario",
    authMethods.CreateUser);

router.post("/login_usuario",
    authMethods.LoginUser);

export default router;