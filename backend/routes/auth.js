const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sql } = require("../db");
const router = express.Router();

const SECRET_KEY = "clave_secreta"; // Usa variables de entorno en producción

// Registro de usuario
router.post("/registro", async (req, res) => {
    const { nombre, email, contrasena } = req.body;
    const hashedPassword = await bcrypt.hash(contrasena, 10);

    try {
        const result = await sql.query`
            INSERT INTO Usuarios (nombre, email, contrasena)
            VALUES (${nombre}, ${email}, ${hashedPassword})`;

        res.status(201).json({ msg: "Usuario registrado con éxito" });
    } catch (err) {
        res.status(500).json({ msg: "Error al registrar usuario", error: err });
    }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
    const { email, contrasena } = req.body;

    try {
        const result = await sql.query`
            SELECT * FROM Usuarios WHERE email = ${email}`;
        
        if (result.recordset.length === 0) {
            return res.status(400).json({ msg: "Usuario no encontrado" });
        }

        const usuario = result.recordset[0];
        const esValido = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!esValido) {
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ token, usuario: { id: usuario.id, nombre: usuario.nombre, email: usuario.email } });
    } catch (err) {
        res.status(500).json({ msg: "Error en el servidor", error: err });
    }
});

module.exports = router;
