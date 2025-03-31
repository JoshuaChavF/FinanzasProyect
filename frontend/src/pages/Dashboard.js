import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ ingresos: 0, gastos: 0, saldo: 0 });
  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/dashboard", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setSummary(data.summary);
        setTransactions(data.transactions);
        setAccounts(data.accounts);
      } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
      }
    };
    fetchData();
  }, []);

  const barChartData = {
    labels: ["Ingresos", "Gastos"],
    datasets: [
      {
        label: "Monto en colones",
        data: [summary.ingresos, summary.gastos],
        backgroundColor: ["#4CAF50", "#F44336"],
      },
    ],
  };

  const pieChartData = {
    labels: transactions.map((t) => t.category),
    datasets: [
      {
        data: transactions.map((t) => t.amount),
        backgroundColor: ["#2196F3", "#FFC107", "#8BC34A", "#FF5722"],
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Panel de Control</h2>
      <div className="summary">
        <h3>Resumen Financiero</h3>
        <p>Ingresos: ₡{summary.ingresos.toFixed(2)}</p>
        <p>Gastos: ₡{summary.gastos.toFixed(2)}</p>
        <p>Saldo: ₡{summary.saldo.toFixed(2)}</p>
      </div>

      <div className="charts">
        <div className="bar-chart">
          <h3>Ingresos vs Gastos</h3>
          <Bar data={barChartData} />
        </div>
        <div className="pie-chart">
          <h3>Categorías de Gastos</h3>
          <Pie data={pieChartData} />
        </div>
      </div>

      <div className="accounts">
        <h3>Cuentas y Saldos</h3>
        <ul>
          {accounts.map((account) => (
            <li key={account.id}>{account.name}: ₡{account.balance.toFixed(2)}</li>
          ))}
        </ul>
      </div>

      <div className="menu">
        <button onClick={() => navigate("/ingresos")}>Ingresos</button>
        <button onClick={() => navigate("/gastos")}>Gastos</button>
        <button onClick={() => navigate("/presupuesto")}>Presupuesto</button>
        <button onClick={() => navigate("/metas")}>Metas Financieras</button>
      </div>
    </div>
  );
};

export default Dashboard;