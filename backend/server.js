require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { connectDB } = require("./db");  // Importamos la conexión

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar a la base de datos al iniciar el servidor
connectDB();

// Importar rutas
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

const PORT = process.env.SERVER_PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
