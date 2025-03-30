import React, { useState } from "react";

const Ingresos = () => {
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lógica para guardar los ingresos en la base de datos
    // Debes hacer una petición POST al backend para guardar los datos.

    console.log({ monto, categoria, descripcion });
    // Resetear campos
    setMonto("");
    setCategoria("");
    setDescripcion("");
  };

  return (
    <div>
      <h2>Registrar Ingreso</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
        />
        <input
          type="text"
          placeholder="Categoría"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">Guardar Ingreso</button>
      </form>
    </div>
  );
};

export default Ingresos;
