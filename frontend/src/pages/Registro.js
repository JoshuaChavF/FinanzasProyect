import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Usamos useNavigate en lugar de useHistory

const Registro = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Usamos useNavigate para redirigir a otra página
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, email })
      });

    if (response.ok) {
      alert("Usuario registrado con éxito");

      // Limpiar los campos después del registro
      setUsername("");
      setEmail("");
      setPassword("");
    } else {
      alert("Error al registrar el usuario");
    }
  };

  // Función para redirigir al login
  const redirectToLogin = () => {
    navigate("/"); // Cambia "/login" a la ruta correspondiente en tu proyecto
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>

      {/* Botón para ir al login */}
      <button onClick={redirectToLogin}>Volver al Login</button>
    </div>
  );
};

export default Registro;
