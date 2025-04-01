import React from 'react';
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu">
      <button onClick={() => navigate("/ingresos")}>Ingresos</button>
      <button onClick={() => navigate("/gastos")}>Gastos</button>
      <button onClick={() => navigate("/presupuesto")}>Presupuesto</button>
      <button onClick={() => navigate("/metas")}>Metas Financieras</button>
    </div>
  );
};

export default Menu;
