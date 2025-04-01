import React, { useState, useEffect } from "react";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select, SelectItem } from "../components/ui/Select";
import { toast } from "react-toastify";
import Menu from "../components/Menu";

const Gastos = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [expenses, setExpenses] = useState([]);

  const categories = [
    "Alquiler",
    "Servicios",
    "Compras",
    "Transporte",
    "Entretenimiento",
    "Salud",
    "Educación",
    "Otros"
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then((res) => res.json())
      .then((data) => setExpenses(data))
      .catch((err) => console.error("Error al obtener los gastos", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newExpense = { amount, category, description };

    const response = await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(newExpense)
    });

    if (response.ok) {
      toast.success("Gasto registrado con éxito");
      setExpenses([...expenses, newExpense]);
      setAmount("");
      setCategory("");
      setDescription("");
    } else {
      toast.error("Error al registrar el gasto");
    }
  };

  return (
    <div className="p-6">
      <Menu />
      <h2 className="text-xl font-bold mb-4">Registro de Gastos</h2>
      <Card className="mb-4">
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              type="number"
              placeholder="Monto"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Seleccionar categoría</option>
              {Array.isArray(categories) && categories.length > 0 ? (
                categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))
              ) : (
                <option disabled>Cargando categorías...</option>
              )}
            </Select>
            <Input
              type="text"
              placeholder="Descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <Button type="submit">Registrar Gasto</Button>
          </form>
        </CardContent>
      </Card>

      <h2 className="text-xl font-bold mt-6 mb-4">Historial de Gastos</h2>
      {expenses.map((expense, index) => (
        <Card key={index} className="mb-2">
          <CardContent>
            <p><strong>Monto:</strong> ${expense.amount}</p>
            <p><strong>Categoría:</strong> {expense.category}</p>
            <p><strong>Descripción:</strong> {expense.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Gastos;