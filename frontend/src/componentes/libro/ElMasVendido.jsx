<<<<<<< HEAD
//TO-DO

import React, { useState, useEffect } from "react";
=======
//NO DEVUELVE

import React, { useState } from "react";
import { useAuth } from "../../Auth";

const LibrosMasVendidos = () => {
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [libros, setLibros] = useState([]);
  const { sesion } = useAuth();
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262

const LibroMasAlquilado = () => {
  const [libro, setLibro] = useState(null);

<<<<<<< HEAD
  // Función para obtener el libro más alquilado
  const obtenerLibroMasAlquilado = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/libros/mas-alquilado"
      );
      if (response.ok) {
        const data = await response.json();
        setLibro(data[0]); // El primer elemento es el libro más alquilado
=======
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
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
      } else {
        alert("Error al obtener el libro más alquilado.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Llamar a la función al cargar el componente
  useEffect(() => {
    obtenerLibroMasAlquilado();
  }, []);

  return (
    <div>
      <h1>Libro Más Alquilado</h1>
      {libro ? (
        <div>
          <h2>{libro.libro}</h2>
          <p>Total Alquileres: {libro.total_alquileres}</p>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

<<<<<<< HEAD
export default LibroMasAlquilado;
=======
export default LibrosMasVendidos;
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
