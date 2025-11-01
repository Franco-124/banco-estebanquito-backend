
import {getConnection} from "../db/db.js";

const CreateUser = async (req , res) => {
    try{
        const {nombre, email, contraseña, numero_cuenta, tipo, saldo}  = req.body;
        const data = {nombre, email, contraseña, numero_cuenta, tipo, saldo};
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO usuarios SET ?", data);
        res.json({message: "User Created successfully"});
        
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
    
}

const getUsers = async (req, res) => {
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM usuarios");
        res.json({status_code: 200, result: result[0]});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const getUser = async (req, res) => {
    const connection = await getConnection();
    const {id} = req.params;
    const result = await connection.query("SELECT * FROM usuarios WHERE id = ?", [id]);
    console.log(result);
    res.json(result[0]);
}

const deleteUser = async (req, res) => {
    try{
        const {id} = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM usuarios WHERE id = ?", [id]);
        console.log(result);
        res.json({status_code: 200, message: "The user was Deleted successfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});

    }
}

const updateUser = async (req, res) => {
    try{
        const {id} = req.params;
        const {numero_id,nombre, edad, correo, ciudad}  = req.body;
        const connection = await getConnection();
        const result = await connection.query(
        "UPDATE usuarios SET numero_id = ?, nombre = ?, email = ?, numero_cuenta = ?, tipo = ?, saldo= ? WHERE id = ?",
        [numero_id, nombre, edad, correo, ciudad, id])
        res.json({status_code: 200, message: "The user was Updated successfully"});

    }catch(error){
        console.log(error);
        res.status(500).json({message: "There was an error trying to update the user"});
    }

}

export const userMethods =  {
    CreateUser,
    getUsers,
    getUser,
    deleteUser,
    updateUser
}