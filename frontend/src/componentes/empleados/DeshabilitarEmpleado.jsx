import React, { useState } from "react";

const DeshabilitarEmpleado = () => {
  const [empleadoId, setEmpleadoId] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setEmpleadoId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/deshabilitarEmpleado",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ empleado_id: empleadoId }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMensaje(data.message); // Mostrar mensaje de éxito
      } else {
        setError(data.message || "Hubo un error al deshabilitar el empleado.");
      }
    } catch (error) {
      console.error("Error al deshabilitar el empleado:", error);
      setError("Error al deshabilitar el empleado.");
    }
  };

  return (
    <div>
      <h1>Deshabilitar Empleado</h1>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

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

        <button type="submit">Deshabilitar Empleado</button>
      </form>
    </div>
  );
};

export default DeshabilitarEmpleado;
