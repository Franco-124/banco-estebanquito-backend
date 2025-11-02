import {Router} from "express";
import { userMethods } from "../../controllers/usuarios/usuarios.controller.js";
const router = Router();

router.get("/",
    userMethods.getUsers);

router.get("/:id",
    userMethods.getUser);

router.delete(":id",
    userMethods.deleteUser);

router.put("/:id",
    userMethods.updateUser);

export default router;