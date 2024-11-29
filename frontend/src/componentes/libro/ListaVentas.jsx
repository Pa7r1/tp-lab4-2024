import React, { useState, useEffect } from "react";
import { useAuth } from "../../Auth";

const ListarVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [totalVentas, setTotalVentas] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10); // Número de elementos por página
  const [mensaje, setMensaje] = useState("");

  const { sesion } = useAuth();

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        // const offset = (pagina - 1) * limite;
        const response = await fetch(`http://localhost:3000/api/v1/ventas`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${sesion.token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al obtener las ventas");
        }

        const data = await response.json();
        setVentas(data.ventas || []);
        setTotalVentas(data.total_ventas || 0);
        setMensaje("");
      } catch (error) {
        console.error("Error al listar ventas:", error);
        setMensaje("Error al cargar las ventas.");
      }
    };

    fetchVentas();
  }, [pagina, limite, sesion.token]);

  const handlePaginaAnterior = () => {
    if (pagina > 1) setPagina(pagina - 1);
  };

  const handlePaginaSiguiente = () => {
    if (pagina < Math.ceil(totalVentas / limite)) setPagina(pagina + 1);
  };

  return (
    <div style={{ borderStyle: "inset", padding: "20px" }}>
      <h2>Listado de Ventas</h2>

      {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}

      <table border="1">
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Fecha Venta</th>
            <th>Total Venta</th>
            <th>Empleado</th>
            <th>Cliente</th>
            <th>ID Libro</th>
            <th>Título Libro</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, index) => (
            <tr key={index}>
              <td>{venta.venta_id}</td>
              <td>{venta.fecha_venta}</td>
              <td>{venta.total_venta}</td>
              <td>{venta.nombre_empleado}</td>
              <td>{venta.nombre_cliente}</td>
              <td>{venta.libro_id}</td>
              <td>{venta.titulo_libro}</td>
              <td>{venta.cantidad}</td>
              <td>{venta.precio_unitario}</td>
              <td>{venta.sub_total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePaginaAnterior} disabled={pagina === 1}>
          Anterior
        </button>
        <span style={{ margin: "0 10px" }}>
          Página {pagina} de {Math.ceil(totalVentas / limite)}
        </span>
        <button onClick={handlePaginaSiguiente} disabled={pagina >= Math.ceil(totalVentas / limite)}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ListarVentas;
