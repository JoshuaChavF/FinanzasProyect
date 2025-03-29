import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficoFinanzas = ({ transacciones }) => {
    const ingresos = transacciones.filter(t => t.tipo === "ingreso");
    const gastos = transacciones.filter(t => t.tipo === "gasto");

    const data = {
        labels: ["Ingresos", "Gastos"],
        datasets: [
            {
                label: "Monto ($)",
                data: [
                    ingresos.reduce((sum, t) => sum + t.monto, 0),
                    gastos.reduce((sum, t) => sum + t.monto, 0)
                ],
                backgroundColor: ["#4caf50", "#f44336"]
            }
        ]
    };

    return <Bar data={data} />;
};

export default GraficoFinanzas;
