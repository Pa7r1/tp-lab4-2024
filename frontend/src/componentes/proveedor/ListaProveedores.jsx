import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth";

const ListaProveedores = ({ refrescar }) => {
  const [proveedores, setProveedores] = useState([]);
  const [error, setError] = useState("");
  const { sesion } = useAuth();

  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/proveedor", {
          method: "GET",
          headers: { Authorization: `Bearer ${sesion.token}` },
        });

        if (!response.ok) {
          throw new Error("Error al obtener los proveedores.");
        }

        const data = await response.json();

        // Extraer la clave PROVEDORES
        if (data && Array.isArray(data.PROVEDORES)) {
          setProveedores(data.PROVEDORES);
        } else {
          console.error("La clave PROVEDORES no contiene un arreglo:", data);
          setProveedores([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchProveedores();
  }, [refrescar, sesion.token]);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (proveedores.length === 0) {
    return <p>No hay proveedores disponibles.</p>;
  }

  return (
    <div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.id}</td>
              <td>{proveedor.nombre}</td>
              <td>{proveedor.telefono}</td>
              <td>{proveedor.email}</td>
              <td>{proveedor.direccion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaProveedores;