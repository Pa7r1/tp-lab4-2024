import React, { useState } from "react";
import { useAuth } from "../../Auth";

<<<<<<< HEAD
const RegistrarVenta = ({ actualizarLibros }) => {
=======
const RegistrarVenta = ({actualizarLibros}) => {
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
  const [empleadoId, setEmpleadoId] = useState("");
  const [clienteId, setClienteId] = useState("");
  const [libros, setLibros] = useState([]);
  const [libroId, setLibroId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");

  const { sesion } = useAuth();

  const handleAgregarLibro = () => {
    if (libroId && parseInt(cantidad) > 0) {
<<<<<<< HEAD
      setLibros([
        ...libros,
        { libro_id: parseInt(libroId), cantidad: parseInt(cantidad) },
      ]);
=======
      setLibros([...libros, { libro_id: parseInt(libroId), cantidad: parseInt(cantidad) }]);
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
      setLibroId("");
      setCantidad("");
    } else {
      setMensaje("Por favor, ingresa un libro y cantidad válida.");
    }
  };

  const handleEliminarLibro = (index) => {
    setLibros(libros.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ventaData = {
      empleado_id: parseInt(empleadoId),
      cliente_id: parseInt(clienteId),
      libros: libros,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/ventas", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${sesion.token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ventaData),
        
      });
      // console.log(ventaData)
      const data = await response.json();
<<<<<<< HEAD
      console.log(data);
=======
      console.log(data)
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
      if (response.ok) {
        window.alert(`Venta registrada con éxito!`);
        setEmpleadoId("");
        setClienteId("");
        setLibros([]);
<<<<<<< HEAD
        actualizarLibros();
=======
        actualizarLibros()
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
      } else {
        setMensaje(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al registrar venta:", error);
      setMensaje("Error al registrar la venta.");
    }
  };

  return (
    <div style={{ borderStyle: "inset", padding: "20px" }}>
      <h2>Registrar Venta</h2>
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
        <hr />
        <h3>Agregar Libros</h3>
        <div>
          <label>Libro ID</label>
          <input
            type="number"
            value={libroId}
            onChange={(e) => setLibroId(e.target.value)}
          />
        </div>
        <div>
          <label>Cantidad</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleAgregarLibro}>
          Agregar Libro
        </button>
        <hr />
        <h3>Libros Agregados</h3>
        <ul>
          {libros.map((libro, index) => (
            <li key={index}>
              Libro ID: {libro.libro_id}, Cantidad: {libro.cantidad}{" "}
              <button type="button" onClick={() => handleEliminarLibro(index)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
        <button type="submit">Registrar Venta</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default RegistrarVenta;
