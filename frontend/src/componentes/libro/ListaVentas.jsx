import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth";

const ListaVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const { sesion } = useAuth();

  const obtenerVentas = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/ventas`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${sesion.token}`,
        },
      });

      const data = await response.json();
      // console.log("Respuesta del backend:", data);

      if (response.ok) {
        setVentas(data.VENTAS); // Asegúrate de usar el campo correcto (VENTAS).
      } else {
        setMensaje(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error al obtener ventas:", error);
      setMensaje("Error al obtener las ventas.");
    }
  };

  useEffect(() => {
    obtenerVentas();
  }, []);

  return (
    <div style={{ borderStyle: "inset", padding: "20px" }}>
      <h2>Lista de Ventas</h2>
      {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Fecha</th>
            <th>Empleado</th>
            <th>Cliente</th>
            <th>Total Venta</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.venta_id}>
              <td>{venta.venta_id}</td>
              <td>{new Date(venta.fecha_venta).toLocaleDateString()}</td>
              <td>{venta.nombre_empleado}</td>
              <td>{venta.nombre_cliente}</td>
              <td>${parseFloat(venta.total_venta).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Aquí mostramos los libros de cada venta */}
      {ventas.map((venta) => (
        <div key={venta.venta_id} style={{ marginTop: "20px" }}>
<<<<<<< HEAD
=======

>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
          {venta.libros && venta.libros.length > 0 ? (
            <table border="1" style={{ width: "100%", textAlign: "left" }}>
              <thead>
                <tr>
                  <th>ID Libro</th>
                  <th>Título</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {venta.libros.map((libro, index) => (
                  <tr key={index}>
                    <td>{libro.libro_id}</td>
                    <td>{libro.titulo_libro}</td>
                    <td>{libro.cantidad}</td>
                    <td>{libro.precio_unitario.toFixed(2)}</td>
<<<<<<< HEAD
                    <td>
                      {(libro.cantidad * libro.precio_unitario).toFixed(2)}
                    </td>
=======
                    <td>{(libro.cantidad * libro.precio_unitario).toFixed(2)}</td>
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p></p>
          )}
        </div>
      ))}
    </div>
  );
};

<<<<<<< HEAD
export default ListaVentas;
=======
export default ListaVentas;
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
