import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth";

const VerificarStock = () => {
  const [stock, setStock] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const { sesion } = useAuth();
  // console.log("Es un arreglo:", Array.isArray(stock));
  // console.log(stock)
  useEffect(() => {
    const fetchStock = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/stock", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sesion.token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setStock(data.Stock_disoponible); // Guardar los resultados del stock
        } else {
          const data = await response.json();
          setMensaje(data.message || "Hubo un error al obtener el stock.");
        }
      } catch (error) {
        console.error("Error al obtener el stock:", error);
        setMensaje("Error al obtener el stock.");
      }
    };

    fetchStock(); // Llamada a la API al cargar el componente
  }, []);
  // var stock = stock.Stock_disoponible
  return (
    <div style={{ backgroundColor: "#d8cdc4" }}>
      {mensaje && <p>{mensaje}</p>}
      <table>
        <thead>
          <tr>
            <th>Libro ID</th>
            <th>Título</th>
            <th>Stock Disponible</th>
          </tr>
        </thead>
        <tbody>
          {stock.length > 0 ? (
            stock.map((libro) => (
              <tr key={libro.libro_id}>
                <td>{libro.libro_id}</td>
                <td>{libro.titulo}</td>
                <td>{libro.stock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No hay libros disponibles en el inventario.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VerificarStock;
