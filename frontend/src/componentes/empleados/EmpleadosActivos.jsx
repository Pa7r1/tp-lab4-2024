import React, { useState, useEffect } from "react";

const EmpleadosActivos = () => {
  const [empleados, setEmpleados] = useState([]);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/empleadosActivos");

        if (response.ok) {
          const data = await response.json();
          setEmpleados(data); // Guardar los resultados de los empleados activos
        } else {
          const data = await response.json();
          setMensaje(data.message || "Hubo un error al obtener los empleados.");
        }
      } catch (error) {
        console.error("Error al obtener los empleados activos:", error);
        setMensaje("Error al obtener los empleados.");
      }
    };

    fetchEmpleados(); // Llamada a la API al cargar el componente
  }, []);

  return (
    <div>
      <h1>Empleados Activos</h1>
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
