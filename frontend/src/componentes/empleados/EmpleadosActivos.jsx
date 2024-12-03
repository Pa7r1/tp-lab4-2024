import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth";

const EmpleadosActivos = ({ refrescar }) => {
  const [empleados, setEmpleados] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { sesion } = useAuth();

  // console.log(empleados)
  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/empleados", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sesion.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data && Array.isArray(data.Empleados)) {
            setEmpleados(data.Empleados);
          } else {
            console.error(error);
            setEmpleados([]);
          }
        } else {
          const data = await response.json();
          setMensaje(data.message || "Hubo un error al obtener los empleados.");
        }
      } catch (error) {
        console.error("Error al obtener los empleados activos:", error);
        setMensaje("Error al obtener los empleados.");
      }
    };
    console.log("empelados", empleados);
    fetchEmpleados(); // Llamada a la API al cargar el componente
  }, [refrescar, sesion.token]);

  return (
    <div>
      {mensaje && <p>{mensaje}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Cargo</th>
            <th>Salario</th>
            <th>Fecha de Contratación</th>
            <th>Usuario</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {empleados.length > 0 ? (
            empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.id}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.cargo}</td>
                <td>{empleado.salario}</td>
                <td>{empleado.fecha_contratacion}</td>
                <td>{empleado.username}</td>
                <td>{empleado.rol}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No hay empleados activos.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmpleadosActivos;
