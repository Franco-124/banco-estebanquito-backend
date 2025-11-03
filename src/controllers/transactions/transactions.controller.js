import {getConnection} from "../../db/db.js";


const getTransactionsByUser = async (req, res) => {
    try{
        console.log("Recuperando informacion de usuario")
        const connection = await getConnection();
        const {id} = req.params
        const result = await  connection.query("SELECT * FROM transacciones WHERE cuenta_id = ?" , [id])
        res.json({
            status_code: 200,
            success: true,
            response: result[0]
        })
        
    }catch(error){
        res.status(500).json({
            status_code: 500,
            success: true,
            response: "Error tratanto de recuperar las transacciones del usuario"

        })
    }
}


const DepostitMoney = async (req, res) => {

}

const WithdrawMoney = async (req, res) => {
    
}


const TransferMoney = async (req, res) => {
    
}



export const TransactionsMethods  = {
    getTransactionsByUser,
}