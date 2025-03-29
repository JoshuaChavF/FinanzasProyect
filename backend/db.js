const sql = require("mssql");

const dbConfig = {
    user: "sa",
    password: "1234",
    server: "localhost",
    database: "FinanzasProyectDB",
    options: { encrypt: false }
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
