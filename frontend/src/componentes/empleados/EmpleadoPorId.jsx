import React, { useState } from "react";

const ObtenerEmpleado = () => {
  const [empleadoId, setEmpleadoId] = useState("");
  const [empleado, setEmpleado] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmpleadoId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/v1/empleado/${empleadoId}`);
      
      if (!response.ok) {
        throw new Error("Empleado no encontrado");
      }

      const data = await response.json();
      setEmpleado(data.empleado);
      setError(""); // Limpiar posibles errores previos
    } catch (error) {
      setError("Empleado no encontrado o error en la solicitud.");
      setEmpleado(null); // Limpiar el estado del empleado
    }
  };

  return (
    <div>
      <h1>Buscar Empleado por ID</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID del Empleado:</label>
          <input
            type="number"
            value={empleadoId}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Buscar Empleado</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {empleado && (
        <div>
          <h3>Empleado Encontrado</h3>
          <p><strong>Nombre:</strong> {empleado.nombre}</p>
          <p><strong>Cargo:</strong> {empleado.cargo}</p>
          <p><strong>Salario:</strong> {empleado.salario}</p>
          <p><strong>Fecha de Contratación:</strong> {empleado.fecha_contratacion}</p>
          <p><strong>Username:</strong> {empleado.username}</p>
          <p><strong>Rol:</strong> {empleado.rol}</p>
        </div>
      )}
    </div>
  );
};

export default ObtenerEmpleado;
