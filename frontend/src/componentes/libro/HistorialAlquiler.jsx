

import React, { useState } from "react";

const HistorialAlquileres = () => {
  const [libroId, setLibroId] = useState("");
  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/v1/historialAlquileres/${libroId}`);

      if (response.ok) {
        const data = await response.json();
        setHistorial(data); // Establecer el historial de alquileres
      } else {
        setMensaje("No se encontraron registros para este libro.");
      }
    } catch (error) {
      console.error("Error al obtener historial de alquileres:", error);
      setMensaje("Error al obtener el historial de alquileres.");
    }
  };

  return (
    <div>
      <h1>Historial de Alquileres de Libro</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Libro ID</label>
          <input
            type="number"
            value={libroId}
            onChange={(e) => setLibroId(e.target.value)}
            required
          />
        </div>
        <button type="submit">Consultar Historial</button>
      </form>

      {mensaje && <p>{mensaje}</p>}

      <table>
        <thead>
          <tr>
            <th>ID Alquiler</th>
            <th>Cliente</th>
            <th>Fecha Alquiler</th>
            <th>Fecha Devolución</th>
            <th>Duración (días)</th>
            <th>Precio Alquiler</th>
          </tr>
        </thead>
        <tbody>
          {historial.map((alquiler) => (
            <tr key={alquiler.alquiler_id}>
              <td>{alquiler.alquiler_id}</td>
              <td>{alquiler.cliente}</td>
              <td>{new Date(alquiler.fecha_alquiler).toLocaleDateString()}</td>
              <td>{new Date(alquiler.fecha_devolucion).toLocaleDateString()}</td>
              <td>{alquiler.duracion_dias}</td>
              <td>{alquiler.precio_alquiler}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistorialAlquileres;
