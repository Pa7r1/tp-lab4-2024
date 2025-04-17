import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface RequireAuthProps {
  requiredRole: string;
  children: React.ReactNode; // Declaramos que acepta children
}

export const RequireAuth = ({ requiredRole, children }: RequireAuthProps) => {
  const { usuario } = useAuth();

  if (!usuario || !usuario.token) {
    return <Navigate to="/" replace />;
  }

  if (usuario.rol !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>; // Renderizamos los children si pasa las validaciones
};
