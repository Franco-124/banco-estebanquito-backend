import {Router} from "express";
import { userMethods } from "../controllers/usuarios.controller.js";
const router = Router();

router.post("/usuarios",
    userMethods.CreateUser);

router.get("/usuarios",
    userMethods.getUsers);

router.delete("/usuarios/:id",
    userMethods.deleteUser);

router.put("/usuarios/:id",
    userMethods.updateUser);

export default router;