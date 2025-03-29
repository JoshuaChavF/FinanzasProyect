require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", require("./routes/auth"));
app.use("/api/transacciones", require("./routes/transacciones"));

app.listen(5000, () => console.log("Servidor corriendo en http://localhost:5000"));
