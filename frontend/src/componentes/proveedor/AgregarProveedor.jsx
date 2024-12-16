import React, { useState } from "react";
import { useAuth } from "../../Auth";

const AgregarProveedor = ({ actualizarProveedores }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const { sesion } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/v1/proveedor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
<<<<<<< HEAD
          Authorization: `Bearer ${sesion.token}`,
        },
        body: JSON.stringify({ nombre, telefono, email, direccion }),
      });

      if (!response.ok) throw new Error("Error al agregar el proveedor.");

      actualizarProveedores();
      setNombre("");
      setTelefono("");
      setEmail("");
      setDireccion("");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Agregar Proveedor</h3>
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Dirección"
        value={direccion}
        onChange={(e) => setDireccion(e.target.value)}
        required
      />
      <button type="submit">Agregar</button>
    </form>
  );
=======
          Authorization: `Bearer ${ sesion.token }`,
        },
    body: JSON.stringify({ nombre, telefono, email, direccion }),
      });

  if (!response.ok) throw new Error("Error al agregar el proveedor.");

  actualizarProveedores();
  setNombre("");
  setTelefono("");
  setEmail("");
  setDireccion("");
} catch (err) {
  console.error(err.message);
}
  };

return (
  <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
    <h3>Agregar Proveedor</h3>
    <input
      type="text"
      placeholder="Nombre"
      value={nombre}
      onChange={(e) => setNombre(e.target.value)}
      required
    />
    <input
      type="text"
      placeholder="Teléfono"
      value={telefono}
      onChange={(e) => setTelefono(e.target.value)}
      required
    />
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    <input
      type="text"
      placeholder="Dirección"
      value={direccion}
      onChange={(e) => setDireccion(e.target.value)}
      required
    />
    <button type="submit">Agregar</button>
  </form>
);
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
};

export default AgregarProveedor;
