import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [transacciones, setTransacciones] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransacciones = async () => {
            const token = localStorage.getItem("token");
            if (!token) return navigate("/");

            try {
                const res = await axios.get("http://localhost:5000/api/transacciones/1"); // ID de usuario temporal
                setTransacciones(res.data);
            } catch (err) {
                console.error("Error al obtener transacciones:", err);
            }
        };

        fetchTransacciones();
    }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <ul>
                {transacciones.map((t) => (
                    <li key={t.id}>{t.tipo} - {t.categoria}: ${t.monto}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
