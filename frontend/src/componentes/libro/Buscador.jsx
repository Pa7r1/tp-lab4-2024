import React, { useState } from "react";
import { useAuth } from "../../Auth";

const BuscadorAvanzado = () => {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [resultados, setResultados] = useState([]);
  const { sesion } = useAuth();

  const handleBuscar = async (e) => {
    e.preventDefault();

    const filtros = {
      titulo: titulo || null,
      autor: autor || null,
      isbn: isbn || null,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/v1/libros/buscar",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sesion.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(filtros),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResultados(data);
      } else {
        console.error("Error en la búsqueda");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  return (
    <div>
      <h2>Buscador Avanzado de Libros</h2>
      <form onSubmit={handleBuscar}>
        <div>
          <label>Título: </label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título del libro"
          />
        </div>
        <div>
          <label>Autor: </label>
          <input
            type="text"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            placeholder="Nombre del autor"
          />
        </div>
        <div>
          <label>ISBN: </label>
          <input
            type="text"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            placeholder="ISBN del libro"
          />
        </div>
        <button type="submit">Buscar</button>
      </form>

      <h3>Resultados:</h3>
      {resultados.length > 0 ? (
        <table border="1">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>ISBN</th>
              <th>Año</th>
              <th>Precio Venta</th>
              <th>Precio Alquiler</th>
              <th>Autor</th>
              <th>Género</th>
              <th>Editorial</th>
            </tr>
          </thead>
          <tbody>
            {resultados.map((libro) => (
              <tr key={libro.libro_id}>
                <td>{libro.libro_id}</td>
                <td>{libro.titulo}</td>
                <td>{libro.isbn}</td>
                <td>{libro.año}</td>
                <td>{libro.precio_venta}</td>
                <td>{libro.precio_alquiler}</td>
                <td>{libro.autor}</td>
                <td>{libro.genero}</td>
                <td>{libro.editorial}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron resultados.</p>
      )}
    </div>
  );
};

export default BuscadorAvanzado;
