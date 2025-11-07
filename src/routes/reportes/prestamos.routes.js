import {Router} from "express";
import { LoanMethods } from "../../controllers/prestamos/prestamos.controller.js";
const router = Router();


router.get("/:id", 
    LoanMethods.GetLoansByUser
)

router.post("/usuario/:id",
    LoanMethods.RegisterLoan
)


export default router;