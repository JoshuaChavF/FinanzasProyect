const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sql } = require("../db");
const router = express.Router();

const SECRET_KEY = "clave_secreta"; // Usa variables de entorno en producción

// Middleware para autenticar el token JWT
const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token no válido" });
  }
};

// Ruta para registrar usuario
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1️⃣ Verificar si el email ya está registrado
    const checkQuery = "SELECT COUNT(*) AS count FROM Users WHERE email = @email";
    const pool = await sql.connect();
    const checkResult = await pool.request().input("email", sql.VarChar, email).query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ message: "El correo ya está registrado. Intenta con otro." });
    }

    // 2️⃣ Encriptar la contraseña antes de guardarla
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Insertar el nuevo usuario
    const query = `
      INSERT INTO Users (username, email, password) 
      VALUES (@username, @email, @password)
    `;
    await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashedPassword)
      .query(query);

    res.status(201).json({ message: "Usuario registrado con éxito" });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Ruta de inicio de sesión
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await sql.connect();
    const query = "SELECT * FROM Users WHERE username = @username";
    const result = await pool.request().input("username", sql.VarChar, username).query(query);

    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const user = result.recordset[0];

    // Comparar contraseña encriptada
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.userId, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    res.json({ token, message: "Inicio de sesión exitoso" });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

// Ruta para agregar un gasto
router.post('/expenses', authenticateToken, async (req, res) => {
  const { amount, category, description } = req.body;
  const userId = req.user.id; // Ahora está disponible después de la autenticación

  // Verifica si los datos necesarios están presentes
  if (!amount || !category || !description) {
    return res.status(400).json({ message: "Faltan datos en la solicitud." });
  }

  try {
    const pool = await sql.connect();  // Establecer la conexión a la base de datos
    // SQL query para insertar un nuevo gasto
    const query = `
      INSERT INTO Transactions (amount, category, description, userId, transactionType)
      VALUES (@amount, @category, @description, @userId, 'gasto');
    `;

    // Realiza la consulta a la base de datos
    await pool.request()
      .input('amount', sql.Decimal, amount)
      .input('category', sql.NVarChar, category)
      .input('description', sql.NVarChar, description)
      .input('userId', sql.Int, userId)
      .query(query);

    // Responde con éxito
    res.status(201).json({ message: "Gasto registrado con éxito." });
  } catch (error) {
    console.error("Error al registrar el gasto:", error);
    res.status(500).json({ message: "Error al registrar el gasto." });
  }
});

module.exports = router;
