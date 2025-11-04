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

const executeDeposit = async (connection, usuario_id, monto, fecha, tipo) => {
    await connection.query("UPDATE usuarios SET saldo = saldo + ? WHERE id = ?", [monto, usuario_id]);
    const transaction_data = {
        cuenta_id: usuario_id,
        tipo: tipo,
        monto: monto,
        fecha: fecha
    };
    await connection.query("INSERT INTO transacciones SET ?", transaction_data);
};


const executeWithdraw = async (connection, usuario_id, monto, fecha, tipo) => {
    await connection.query("UPDATE usuarios SET saldo = saldo - ? WHERE id = ?", [monto, usuario_id]);
    const transaction_data = {
        cuenta_id: usuario_id,
        tipo: tipo,
        monto: monto,
        fecha: fecha
    };
    await connection.query("INSERT INTO transacciones SET ?", transaction_data);
};


const DepostitMoney = async (req, res) => {
    try{
        const connection = await getConnection();
        const hoy = new Date();
        const fecha = hoy.toISOString().split('T')[0]; 
        const {usuario_id, monto} = req.body;

        if (monto <= 0){
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "El monto a depositar debe ser mayor a cero"
            })
        }

        
        await executeDeposit(connection, usuario_id, monto, fecha, 'deposito');
        
        res.json({
            status_code: 200,
            success: true,
            response: "El deposito se ha realizado con exito"
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            status_code: 500,
            success: false,
            response: "Hubo un error tratanto de realizar el deposito"
        });
    }
};


const VerifyAmmount = async (connection, usuario_id, monto) => {
    const [saldo_result] = await connection.query("SELECT saldo FROM usuarios WHERE id = ?", [usuario_id]);
    const saldo_actual = saldo_result[0].saldo;
    return saldo_actual >= monto;
}

const WithdrawMoney = async (req, res) => {
    try{
        const connection = await getConnection();
        const hoy = new Date();
        const fecha = hoy.toISOString().split('T')[0]; 
        const {usuario_id, monto} = req.body;

        if (monto <= 0){
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "El monto a retirar debe ser mayor a cero"
            })
        }

        const verification = await VerifyAmmount(connection, usuario_id, monto);

        if (!verification){
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "Fondos insuficientes para realizar el retiro"
            })
        }
        
        await executeWithdraw(connection, usuario_id, monto, fecha, 'retiro');
        
        res.json({
            status_code: 200,
            success: true,
            response: "El retiro se ha realizado con exito"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            status_code: 500,
            success: false,
            response: "Hubo un error tratanto de realizar el retiro"
        });
    }
};
    

const TransferMoney = async (req, res) => {
    try{
        const connection = await getConnection();
        const hoy = new Date();
        const fecha = hoy.toISOString().split('T')[0]; 
        const {usuario_id, cuenta_destino, monto} = req.body;

        if (monto <= 0){
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "El monto a transferir debe ser mayor a cero"
            })
        }

        const verification = await VerifyAmmount(connection, usuario_id, monto);

        if (!verification){
            return  res.status(400).json({
                status_code: 400,
                success: false,
                response: "Fondos insuficientes para realizar la transferencia"
            })
        }

        const [cuenta_id_result] = await connection.query("SELECT id FROM usuarios WHERE numero_cuenta = ?", [cuenta_destino]);

        if (!cuenta_id_result || cuenta_id_result.length === 0) {
            return res.status(404).json({
                status_code: 404,
                success: false,
                response: "La cuenta destino no existe"
            });
        }

        const cuenta_destino_id = cuenta_id_result[0].id;
        await executeWithdraw(connection, usuario_id, monto, fecha, 'transferencia');
        await executeDeposit(connection, cuenta_destino_id, monto, fecha, 'depósito');

        res.json({
            status_code: 200,
            success: true,
            response: "La transferencia se ha realizado con exito"
        })

    }catch(error){
        res.status(500).json({
            status_code: 500,
            success: false,
            response: "Hubo un error tratanto de realizar la transferencia, Intente de nuevo mas tarde"
        })
    }
}


export const TransactionsMethods  = {
    getTransactionsByUser,
    VerifyAccountNumber,
    DepostitMoney,
    WithdrawMoney,
    TransferMoney
}