import React, { useState, useEffect } from "react";

const LibroMasAlquilado = () => {
  const [libro, setLibro] = useState(null);

  // Función para obtener el libro más alquilado
  const obtenerLibroMasAlquilado = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/libros/mas-alquilado");
      if (response.ok) {
        const data = await response.json();
        setLibro(data[0]); // El primer elemento es el libro más alquilado
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

export default LibroMasAlquilado;
