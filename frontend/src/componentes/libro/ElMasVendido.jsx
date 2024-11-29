//NO DEVUELVE

import React, { useState } from "react";
import { useAuth } from "../../Auth";

const LibrosMasVendidos = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [libros, setLibros] = useState([]);
  const { sesion } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir la URL con los parámetros de consulta (query parameters)
    const url = new URL("http://localhost:3000/api/v1/ventas/libro");
    const params = { 
      fecha_inicio: fechaInicio, 
      fecha_fin: fechaFin 
    };

    // Agregar los parámetros a la URL
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sesion.token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLibros(data);
        alert(`Libros más vendidos: ${JSON.stringify(data)}`); // Almacena los libros más vendidos
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