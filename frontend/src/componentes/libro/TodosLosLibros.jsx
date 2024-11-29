import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth";

const ListaLibrosActivos = () => {
  var [libritos, setLibritos] = useState([]);
  const [error, setError] = useState("");
  const {sesion} = useAuth()
  console.log("Libros recibidos:", libritos);
  console.log("Es un arreglo:", Array.isArray(libritos));

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/libros",{
            // method: "GET",
            headers: {Authorization: `Bearer ${sesion.token}`}
        })

        if (!response.ok) {
          throw new Error("Error al obtener los libros activos.");
        }
        const data = await response.json();
        setLibritos(data);
      } catch (error) {
        setError(error.message);
      }
    };
    
    fetchLibros();
  }, []);

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }
  var libritos = libritos.LIBROS || [];
  return (
    <div style={{backgroundColor: "#d8cdc4"}}>
        
      <h2>Libros Activos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>ISBN</th>
            <th>Género</th>
            <th>Autor</th>
            <th>Editorial</th>
            <th>Año</th>
            <th>Precio Venta</th>
            <th>Precio Alquiler</th>
          </tr>
        </thead>
        <tbody>
          {libritos.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.isbn}</td>
              <td>{libro.genero}</td>
              <td>{libro.autor}</td>
              <td>{libro.editorial}</td>
              <td>{libro.año}</td>
              <td>{libro.precio_venta}</td>
              <td>{libro.precio_alquiler}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListaLibrosActivos;
