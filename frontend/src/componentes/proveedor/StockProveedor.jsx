import React, { useState } from "react";

const ReponerStockProveedor = () => {
  const [proveedorId, setProveedorId] = useState("");
  const [libroId, setLibroId] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reposicion = {
      proveedor_id: proveedorId,
      libro_id: libroId,
      cantidad: cantidad,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v1/reponerStock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reposicion),
      });

      if (response.ok) {
        setMensaje("Stock reponido exitosamente.");
        // Limpiar los campos
        setProveedorId("");
        setLibroId("");
        setCantidad("");
      } else {
        const data = await response.json();
        setMensaje(data.message || "Hubo un error al reponer el stock.");
      }
    } catch (error) {
      console.error("Error al reponer stock:", error);
      setMensaje("Error al reponer el stock.");
    }
  };

  return (
    <div>
      <h1>Reponer Stock de Proveedor</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Proveedor ID</label>
          <input
            type="number"
            value={proveedorId}
            onChange={(e) => setProveedorId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Libro ID</label>
          <input
            type="number"
            value={libroId}
            onChange={(e) => setLibroId(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Cantidad</label>
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reponer Stock</button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default ReponerStockProveedor;
