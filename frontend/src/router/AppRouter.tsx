import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login/LoginPage";
import Dashboard from "../pages/Dashboard";
import LibrosPage from "../pages/libros/LibrosPage";
import Empleados from "../pages/empleados/EmpleadosPage";
import { RequireAuth } from "../auth/RequireAuth";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/libros" element={<LibrosPage />} />
      <Route
        path="/empleados"
        element={
          <RequireAuth requiredRole="administrador">
            <Empleados />
          </RequireAuth>
        }
      />
      <Route path="/unauthorized" element={<h1>No autorizado</h1>} />
    </Routes>
  );
};

export default AppRouter;
