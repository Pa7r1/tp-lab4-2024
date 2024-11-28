import React, { useState } from "react";
import {useAuth} from  "../../Auth"
const AgregarLibro = () => {

  const {sesion} = useAuth()
  
  const [formulario, setFormulario] = useState({
    titulo: "",
    genero_nombre: "",
    autor_nombre: "",
    editorial_nombre: "",
    año: "",
    stock_inicial: "",
    precio_venta: "",
    precio_alquiler: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/libros/nuevoLibro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           Authorization: `Bearer ${sesion.token}` ,
        },
        body: JSON.stringify(formulario),
      });

      if (response.ok) {
        const data = await response.json();
        alert("Libro agregado con éxito: " + JSON.stringify(data));
      } else {
        alert("Error al agregar el libro.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={formulario.titulo}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="genero_nombre"
        placeholder="Género"
        value={formulario.genero_nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="autor_nombre"
        placeholder="Autor"
        value={formulario.autor_nombre}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="editorial_nombre"
        placeholder="Editorial"
        value={formulario.editorial_nombre}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="año"
        placeholder="Año"
        value={formulario.año}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock_inicial"
        placeholder="Stock Inicial"
        value={formulario.stock_inicial}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="precio_venta"
        placeholder="Precio Venta"
        step="0.01"
        value={formulario.precio_venta}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="precio_alquiler"
        placeholder="Precio Alquiler"
        step="0.01"
        value={formulario.precio_alquiler}
        onChange={handleChange}
        required
      />
      <button type="submit">Agregar Libro</button>
    </form>
  );
};

export default AgregarLibro;