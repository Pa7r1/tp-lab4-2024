import React, { useState } from "react";
import ListaProveedores from "../componentes/proveedor/ListaProveedores";
import AgregarProveedor from "../componentes/proveedor/AgregarProveedor";

const Proveedores = () => {
  const [refrescar, setRefrescar] = useState(false);

  const actualizarProveedores = () => {
    setRefrescar((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#f5f5f5" }}>
      <h1>Gestión de Proveedores</h1>
      <div
        style={{
          border: "1px solid #ddd",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        <AgregarProveedor actualizarProveedores={actualizarProveedores} />
        <ListaProveedores refrescar={refrescar} />
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default Proveedores;
=======
export default Proveedores;
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
