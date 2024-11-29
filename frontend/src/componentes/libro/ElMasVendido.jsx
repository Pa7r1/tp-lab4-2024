import React, { useState } from "react";
import { useAuth } from "../../Auth";

const LibrosMasVendidos = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [libros, setLibros] = useState([]);
  const {sesion} = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/ventas/libro", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sesion.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fecha_inicio: fechaInicio, fecha_fin: fechaFin }),
      });

      if (response.ok) {
        const data = await response.json();
        setLibros(data);
        alert(`libro mas vendido: ${data}`) // Almacena los libros más vendidos
      } else {
        alert("Error al obtener los libros más vendidos.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Fecha de inicio:
          <input
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
            required
          />
        </label>
        <label>
          Fecha de fin:
          <input
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
            required
          />
        </label>
        <button type="submit">Obtener Libros Más Vendidos</button>
      </form>

      <div>
        {libros.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Total Vendido</th>
              </tr>
            </thead>
            <tbody>
              {libros.map((libro) => (
                <tr key={libro.id}>
                  <td>{libro.titulo}</td>
                  <td>{libro.total_vendido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default LibrosMasVendidos;
