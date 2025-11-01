
import {getConnection} from "../db/db.js";


const getUsers = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuarios");
        res.json({
            status_code: 200,
            success:true,
            response: result[0]
        });
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            status_code: 500, 
            success:false, 
            response: "Hubo un error al tratar de obtener los usuarios"
        });
    }
}

const getUser = async (req, res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const result = await connection.query("SELECT * FROM usuarios WHERE id = ?", [id]);
        console.log(result);
        res.json({
            status_code : 200,
            success:true,
            response: result[0]
        });

    }catch(error){
        res.status(500).json({
            status_code: 500, 
            success:false, 
            response: "Hubo un error al tratar de obtener el usuario"
        });
    }
   
}

const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuarios WHERE id = ?", [id]);
        console.log(result);
        res.json({
            status_code: 200,
            success:true, 
            response: "El usuario fue eliminado exitosamente"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            status_code: 500,
            success: false, 
            response: "Internal Server Error"
        });

    }
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, email, contraseña, numero_cuenta, tipo, saldo } = req.body;
        const connection = await getConnection();
        const result = await connection.query(
        "UPDATE usuarios SET nombre = ?, email = ?, contraseña = ?, numero_cuenta = ?, tipo = ?, saldo = ? WHERE id = ?",
        [nombre, email, contraseña, numero_cuenta, tipo, saldo, id]
        );

        res.json({
        status_code: 200,
        success: true,
        response: "El usuario fue actualizado exitosamente"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
        status_code: 500,
        success: false,
        message: "Hubo un error al tratar de actualizar el usuario"
        });
    }
};

export const userMethods =  {
    getUsers,
    getUser,
    deleteUser,
    updateUser
}