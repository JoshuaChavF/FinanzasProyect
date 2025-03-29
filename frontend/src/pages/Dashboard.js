import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Dashboard = () => {
    const [transacciones, setTransacciones] = useState([]);
    const [presupuestos, setPresupuestos] = useState([]);
    const { user, logout } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            const resTrans = await axios.get(`http://localhost:5000/api/transacciones/${user.id}`);
            const resPres = await axios.get(`http://localhost:5000/api/presupuestos/${user.id}`);
            setTransacciones(resTrans.data);
            setPresupuestos(resPres.data);
        };
        fetchData();
    }, [user]);

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={logout}>Cerrar Sesión</button>

            {presupuestos.map(p => {
                const gastoTotal = transacciones
                    .filter(t => t.tipo === "gasto" && t.categoria === p.categoria)
                    .reduce((sum, t) => sum + t.monto, 0);

                return gastoTotal > p.limite && <p key={p.id} style={{ color: "red" }}>¡Alerta! Excediste el presupuesto en {p.categoria}</p>;
            })}
        </div>
    );
};

export default Dashboard;
