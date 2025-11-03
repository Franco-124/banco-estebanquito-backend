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

const VerifyAccountNumber = async  (req, res) => {
    try{
        const connection = await getConnection();
        const {numero_cuenta} = req.params;
        console.log(numero_cuenta)
        const [result] = await connection.query("SELECT * FROM usuarios where numero_cuenta = ?", [numero_cuenta])
        console.log(result)

        if (result.length > 0){
            res.json({
                status_code: 200,
                success: true,
                response: "La cuenta del usuario si existe"
            })

        }else{
            res.json({
                status_code: 401,
                success: false,
                response: "La cuenta del usuario no pudo ser encontrada"
            }
            )
        }

    }catch(error){
        res.status(500).json({
            status_code: 500,
            success: false,
            response: "Hubo un error tratanto de verificar el numero de cuenta"
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
    VerifyAccountNumber
}