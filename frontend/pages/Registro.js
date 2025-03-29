import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [contrasena, setContrasena] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/auth/registro", { nombre, email, contrasena });
            navigate("/");
        } catch (err) {
            console.error("Error en el registro:", err);
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Registro;
