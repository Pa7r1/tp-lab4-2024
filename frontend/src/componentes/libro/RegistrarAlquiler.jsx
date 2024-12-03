// TO-DO
import React, { useState } from "react";

const RegistrarAlquiler = () => {
  const [empleadoId, setEmpleadoId] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [libroId, setLibroId] = useState("");
  const [duracionDias, setDuracionDias] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const alquilerData = {
      empleado_id: empleadoId,
      cliente_id: clienteId,
      libro_id: libroId,
      duracion_dias: duracionDias,
      cantidad: cantidad,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/alquiler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(alquilerData),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje(
          `Alquiler registrado con éxito! ID de alquiler: ${data.id_alquiler}`
        );
      } else {
        setMensaje(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al registrar alquiler:", error);
      setMensaje("Error al registrar el alquiler.");
    }
  };

  return (
    <div>
      <h1>Registrar Alquiler</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Empleado ID</label>
          <input
            type="number"
            value={empleadoId}
            onChange={(e) => setEmpleadoId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cliente ID</label>
          <input
            type="number"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Libro ID</label>
          <input
            type="number"
            value={libroId}
            onChange={(e) => setLibroId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Duración (días)</label>
          <input
            type="number"
            value={duracionDias}
            onChange={(e) => setDuracionDias(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <button type="submit">Registrar Alquiler</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default RegistrarAlquiler;
