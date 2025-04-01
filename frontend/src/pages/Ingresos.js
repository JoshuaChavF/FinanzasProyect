import React, { useState, useEffect } from "react";
import Menu from "../components/Menu"; // Importar el componente Menu

const Ingresos = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salario");
  const [ingresos, setIngresos] = useState([]);
  const userId = localStorage.getItem("userId"); // Obtener el usuario autenticado

  useEffect(() => {
    fetch(`http://localhost:5000/api/transactions?userId=${userId}&type=ingreso`)
      .then((res) => res.json())
      .then((data) => setIngresos(data));
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        type: "ingreso",
        category,
        amount: parseFloat(amount),
      }),
    });

    if (response.ok) {
      alert("Ingreso registrado exitosamente");
      setAmount("");
      setIngresos([...ingresos, { category, amount: parseFloat(amount) }]);
    } else {
      alert("Error al registrar el ingreso");
    }
  };

  return (
    <div>
      <Menu /> {/* Agregar el componente Menu aquí */}

      <h2>Registro de Ingresos</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Monto"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Salario">Salario</option>
          <option value="Inversiones">Inversiones</option>
          <option value="Freelance">Freelance</option>
          <option value="Bonos">Bonos</option>
          <option value="Otros">Otros</option>
        </select>
        <button type="submit">Agregar Ingreso</button>
      </form>

      <h3>Historial de Ingresos</h3>
      <ul>
        {ingresos.map((ingreso, index) => (
          <li key={index}>{ingreso.category}: ${ingreso.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Ingresos;
