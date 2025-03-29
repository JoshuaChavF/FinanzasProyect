const express = require("express");
const { sql } = require("../db");
const router = express.Router();

// Obtener transacciones por usuario
router.get("/:usuarioId", async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const result = await sql.query`
            SELECT * FROM Transacciones WHERE usuario_id = ${usuarioId}`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ msg: "Error al obtener transacciones", error: err });
    }
});

// Registrar una transacción
router.post("/", async (req, res) => {
    const { usuario_id, tipo, categoria, monto, fecha } = req.body;

    try {
        await sql.query`
            INSERT INTO Transacciones (usuario_id, tipo, categoria, monto, fecha)
            VALUES (${usuario_id}, ${tipo}, ${categoria}, ${monto}, ${fecha})`;

        res.status(201).json({ msg: "Transacción registrada con éxito" });
    } catch (err) {
        res.status(500).json({ msg: "Error al registrar transacción", error: err });
    }
});

module.exports = router;
