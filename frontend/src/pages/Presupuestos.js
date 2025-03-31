import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Presupuestos = () => {
  const [presupuestos, setPresupuestos] = useState([]);
  const [categoria, setCategoria] = useState("");
  const [monto, setMonto] = useState("");
  const [metas, setMetas] = useState([]);
  const [metaDescripcion, setMetaDescripcion] = useState("");
  const [metaMonto, setMetaMonto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Aquí puedes hacer una petición al backend para obtener los presupuestos y metas del usuario
    setPresupuestos([
      { id: 1, categoria: "Alimentación", monto: 200, gastado: 180 },
      { id: 2, categoria: "Transporte", monto: 150, gastado: 120 },
    ]);

    setMetas([
      { id: 1, descripcion: "Ahorro para vacaciones", monto: 500 },
      { id: 2, descripcion: "Pago de deudas", monto: 300 },
    ]);
  }, []);

  const agregarPresupuesto = () => {
    const nuevoPresupuesto = {
      id: presupuestos.length + 1,
      categoria,
      monto: parseFloat(monto),
      gastado: 0,
    };
    setPresupuestos([...presupuestos, nuevoPresupuesto]);
    setCategoria("");
    setMonto("");
  };

  const agregarMeta = () => {
    const nuevaMeta = {
      id: metas.length + 1,
      descripcion: metaDescripcion,
      monto: parseFloat(metaMonto),
    };
    setMetas([...metas, nuevaMeta]);
    setMetaDescripcion("");
    setMetaMonto("");
  };

  return (
    <div>
      <h2>Presupuestos y Metas Financieras</h2>

      <h3>Presupuestos</h3>
      <ul>
        {presupuestos.map((p) => (
          <li key={p.id}>
            {p.categoria}: ${p.gastado} / ${p.monto} {p.gastado > p.monto && <span style={{ color: "red" }}>¡Presupuesto excedido!</span>}
          </li>
        ))}
      </ul>
      <input type="text" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)} />
      <input type="number" placeholder="Monto" value={monto} onChange={(e) => setMonto(e.target.value)} />
      <button onClick={agregarPresupuesto}>Agregar Presupuesto</button>

      <h3>Metas Financieras</h3>
      <ul>
        {metas.map((m) => (
          <li key={m.id}>{m.descripcion}: ${m.monto}</li>
        ))}
      </ul>
      <input type="text" placeholder="Descripción" value={metaDescripcion} onChange={(e) => setMetaDescripcion(e.target.value)} />
      <input type="number" placeholder="Monto" value={metaMonto} onChange={(e) => setMetaMonto(e.target.value)} />
      <button onClick={agregarMeta}>Agregar Meta</button>

      <button onClick={() => navigate("/dashboard")} style={{ marginTop: "20px" }}>Volver al Dashboard</button>
    </div>
  );
};

export default Presupuestos;