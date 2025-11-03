import {getConnection} from "../../db/db.js";


const CreateUser = async (req , res) => {
    try{
        const {nombre, email, contraseña, numero_cuenta, tipo, saldo}  = req.body;
        const data = {nombre, email, contraseña, numero_cuenta, tipo, saldo};
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO usuarios SET ?", data);
        res.json({
            status_code: 200, 
            success: true,  
            response: "Usuario creado exitosamente en el sistema"
        });
        
    }catch(error){
        console.log(error);
        res.status(500).json({
            status_code: 500, 
            success: false, 
            response: "Hubo un error al tratar de crear el usuario"
        });
    }
    
}

const LoginUser = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const connection = await getConnection();

    const [result] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ? AND contraseña = ?",
      [email, contraseña]
    );

    if (result.length > 0) {
      res.json({
        status_code: 200,
        success: true,
        response: "Inicio de sesión exitoso",
        nombre_usuario : result[0].nombre,
        id: result[0].id,
        saldo: result[0].saldo,
        tipo: result[0].tipo
      });
      
    } else {
      res.status(401).json({
        status_code: 401,
        success: false,
        response: "Usuario o contraseña incorrectos",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status_code: 500,
      success: false,
      response: "Hubo un error al tratar de iniciar sesión",
    });
  }
};

export const authMethods =  {
    CreateUser,
    LoginUser
}

