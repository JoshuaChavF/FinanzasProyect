import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get("http://localhost:5000/api/auth/me", {
                headers: { Authorization: `Bearer ${token}` }
            }).then(res => {
                setUser(res.data);
            }).catch(() => {
                localStorage.removeItem("token");
                navigate("/");
            });
        }
    }, [navigate]);

    const logout = () => {
        setUser(null);
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
