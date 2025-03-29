const express = require("express");
const { sql } = require("../db");
const router = express.Router();

// Obtener presupuestos por usuario
router.get("/:usuarioId", async (req, res) => {
    const { usuarioId } = req.params;

    try {
        const result = await sql.query`
            SELECT * FROM Presupuestos WHERE usuario_id = ${usuarioId}`;
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ msg: "Error al obtener presupuestos", error: err });
    }
});

// Crear un nuevo presupuesto
router.post("/", async (req, res) => {
    const { usuario_id, categoria, limite } = req.body;

    try {
        await sql.query`
            INSERT INTO Presupuestos (usuario_id, categoria, limite)
            VALUES (${usuario_id}, ${categoria}, ${limite})`;

        res.status(201).json({ msg: "Presupuesto creado" });
    } catch (err) {
        res.status(500).json({ msg: "Error al crear presupuesto", error: err });
    }
});

module.exports = router;
