import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const getLibros = () => {
    navigate("/libros");
  };

  const getEmpleados = () => {
    navigate("/empleados");
  };
  const cerrarSesion = () => {
    logout();
    navigate("/");
  };

  return (
    <div>
      <h1>Bienvenido, {usuario?.username}!</h1>
      <p>Rol: {usuario?.rol}</p>

      <button onClick={getLibros}>libros</button>
      <button onClick={getEmpleados}>Empleados</button>
      <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
