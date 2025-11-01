import {Router} from "express";
import { userMethods } from "../controllers/usuarios.controller.js";
const router = Router();

router.get("/usuarios",
    userMethods.getUsers);

router.get("/usuarios/:id",
    userMethods.getUser);

router.delete("/usuarios/:id",
    userMethods.deleteUser);

router.put("/usuarios/:id",
    userMethods.updateUser);

export default router;