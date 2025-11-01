import mysql from "mysql2/promise";
import config from "../../config.js";


export const getConnection = async () => {
    const connection = await mysql.createConnection({
        host: config.dbHost,
        user: config.dbUser,
        password: config.dbPassword,
        database: config.dbName,
        port: config.dbPort
    });
    return connection;
};


export default {
    getConnection
};