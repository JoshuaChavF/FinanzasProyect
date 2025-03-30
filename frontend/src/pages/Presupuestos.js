import React, { useState } from "react";

const Presupuestos = () => {
  const [categoria, setCategoria] = useState("");
  const [monto, setMonto] = useState("");
  const [metas, setMetas] = useState([]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevaMeta = { categoria, monto };
    setMetas([...metas, nuevaMeta]);
    setCategoria("");
    setMonto("");
  };

  return (
    <div>
      <h2>Presupuestos y Metas Financieras</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <button type="submit">Agregar Presupuesto</button>
      </form>

      <h3>Metas Financieras</h3>
      <ul>
        {metas.map((meta, index) => (
          <li key={index}>
            {meta.categoria}: ${meta.monto}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Presupuestos;
