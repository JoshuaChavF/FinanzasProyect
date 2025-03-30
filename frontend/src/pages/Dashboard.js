import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [finances, setFinances] = useState({
    ingresos: 0,
    gastos: 0,
    saldo: 0,
    ingresosMensuales: [],
    gastosMensuales: []
  });

  // Simulando datos de ejemplo (deberías obtener estos datos desde la API o base de datos)
  useEffect(() => {
    const fetchData = async () => {
      // Obtén los datos desde tu backend (esto es solo un ejemplo)
      setFinances({
        ingresos: 5000, // Ejemplo de ingresos totales
        gastos: 2500, // Ejemplo de gastos totales
        saldo: 2500, // Saldo actual
        ingresosMensuales: [1000, 1200, 1100, 1300, 1400, 1500], // Ejemplo de ingresos mensuales
        gastosMensuales: [700, 800, 600, 700, 900, 900] // Ejemplo de gastos mensuales
      });
    };

    fetchData();
  }, []);

  // Configuración de los gráficos
  const data = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Ingresos',
        data: finances.ingresosMensuales,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        tension: 0.4,
      },
      {
        label: 'Gastos',
        data: finances.gastosMensuales,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        tension: 0.4,
      }
    ]
  };

  return (
    <div>
      <h2>Panel de Control</h2>
      <div>
        <h3>Vista General</h3>
        <p><strong>Ingresos Totales:</strong> ${finances.ingresos}</p>
        <p><strong>Gastos Totales:</strong> ${finances.gastos}</p>
        <p><strong>Saldo:</strong> ${finances.saldo}</p>
      </div>

      <div>
        <h3>Gráficos de Ingresos y Gastos</h3>
        <Line data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
