require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    port: parseInt(process.env.PORT, 10),  
    database: process.env.DB_DATABASE,
    options: { encrypt: false, trustServerCertificate: true }
};

async function connectDB() {
    try {
        await sql.connect(dbConfig);
        console.log("Conectado a SQL Server");
    } catch (err) {
        console.error("Error al conectar a la BD:", err);
    }
}

module.exports = { connectDB, sql };
