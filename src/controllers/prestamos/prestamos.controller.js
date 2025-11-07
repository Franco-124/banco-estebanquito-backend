import {getConnection} from "../../db/db.js";

const RegisterLoan = async (req, res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const {monto, plazo, estado} = req.body;

        if (!plazo || !estado || !monto) {
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "Faltan datos obligatorios para registrar el prestamo"
            });
        }

        if (typeof plazo !== "string" && typeof plazo !== "number") {
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "El plazo debe ser un valor valido en meses"
            });
        }

        const plazo_meses = parseInt(plazo);

        if (typeof estado !== 'string') {
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "El estado debe ser un valor valido entre (aprobado, pendiente, rechazado)"
            });
        }

        if (typeof monto !== 'string' && typeof monto !== 'number') {
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "El monto debe ser un numero válido"
            });
        }
    
        const cantidad = parseFloat(monto);
        if (!Number.isFinite(cantidad) || cantidad <= 0) {
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "El monto a depositar debe ser un número válido y mayor a cero"
            });
        }

        if (!Number.isInteger(cantidad)) {
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "El monto a depositar debe ser un número valido y entero"
            });
        }

        const estados_permitidos = ['pendiente', 'aprobado', 'rechazado'];
        if (!estados_permitidos.includes(estado.toLowerCase())) {
            return res.status(400).json({
                status_code: 400,
                success: false,
                response: "El estado debe ser un valor valido entre (aprobado, pendiente, rechazado)"
            });
        }

        const data = {
            usuario_id: id,
            monto: cantidad,
            plazo: plazo_meses,
            estado: estado,
            fecha_solicitud: new Date().toISOString().split('T')[0]   
        }

        const result = await connection.query("INSERT INTO prestamos SET ?", data);
        console.log(result);
        return res.json({
            status_code: 200,
            success: true,
            response: "Prestamo registrado exitosamente en el sistema"
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            status_code: 500,
            success: false,
            response: "Error tratando de registrar el prestamo, Intente de nuevo mas tarde"
        });

    }
}


const GetLoansByUser = async (req, res) => {
    try{
        const connection = await getConnection();
        const {id} = req.params;
        const result = await connection.query("SELECT * FROM prestamos WHERE usuario_id = ?", [id]);
        res.json({
            status_code: 200,
            success: true,
            response: result[0]
        });

    }catch(error){
        res.status(500).json({
            status_code: 500,
            success: false,
            response: "Hubo un error al tratar de obtener los prestamos del usuario"
        })

    }
}





export const LoanMethods = {
    RegisterLoan,
    GetLoansByUser
}