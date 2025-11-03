import {Router} from "express";
import { TransactionsMethods } from "../../controllers/transactions/transactions.controller.js";
const router = Router();


router.get("/:id",
    TransactionsMethods.getTransactionsByUser
)

router.get("/cuentas/:numero_cuenta", 
    TransactionsMethods.VerifyAccountNumber)


export default router;