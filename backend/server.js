const express = require('express');
const cors = require('cors');  // Importamos cors
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const mssql = require('mssql');

// Habilitamos CORS
app.use(cors());
app.use(bodyParser.json());

// Configuración de la base de datos
const dbConfig = {
  user: 'sa',
  password: '1234',
  server: 'localhost',
  database: 'FinanzasDB',
  options: {
    encrypt: true,  // Para conexión segura
    trustServerCertificate: true // Si es necesario para evitar problemas con SSL
  }
};

// Ruta de registro de usuario
app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;
  
  if (!username || !password || !email) {
    return res.status(400).send('Todos los campos son obligatorios');
  }

  try {
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Conexión a la base de datos
    const pool = await mssql.connect(dbConfig);

    // Utiliza parámetros para evitar problemas de inyección SQL
    const result = await pool.request()
      .input('username', mssql.NVarChar, username)  // Declarar el parámetro username
      .input('password', mssql.NVarChar, hashedPassword)  // Declarar el parámetro password
      .input('email', mssql.NVarChar, email)  // Declarar el parámetro email
      .query(`
        INSERT INTO Users (username, password, email)
        VALUES (@username, @password, @email)
      `);
    
    res.status(201).send('Usuario registrado');
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).send('Error al registrar el usuario');
  } finally {
    // Cerrar la conexión después de la consulta
    await mssql.close();
  }
});

// Inicia el servidor
app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});
