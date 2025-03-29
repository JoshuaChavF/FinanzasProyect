import React from "react";

const Login = () => {
  return (
    <div>
      <h2>Página de Login</h2>
      <form>
        <input type="text" placeholder="Usuario" />
        <input type="password" placeholder="Contraseña" />
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
