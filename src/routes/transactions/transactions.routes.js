import {Router} from "express";
import { TransactionsMethods } from "../../controllers/transactions/transactions.controller.js";
const router = Router();


router.get("/:id",
    TransactionsMethods.getTransactionsByUser
)


export default router;