import {Router} from "express";
import { TransactionsMethods } from "../../controllers/transactions/transactions.controller.js";
const router = Router();


router.get("/:id",
    TransactionsMethods.getTransactionsByUser
)

router.get("/cuentas/:numero_cuenta", 
    TransactionsMethods.VerifyAccountNumber)

router.post("/cuentas/depositar",
    TransactionsMethods.DepostitMoney)


router.post("/cuentas/retirar",
    TransactionsMethods.WithdrawMoney)


router.post("/cuentas/transferir",
    TransactionsMethods.TransferMoney)

export default router;