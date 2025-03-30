import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Página de Login</h2>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
      </form>
      <p>¿No tienes una cuenta?</p>
      <button onClick={() => navigate("/registro")}>Registrarse</button>
    </div>
  );
};

export default Login;
