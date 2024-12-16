import React, { useState } from "react";
import { useAuth } from "../../Auth";

const AgregarEmpleado = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    cargo: "",
    salario: "",
    fecha_contrato: "",
    username: "",
    password: "",
    rol: "empleado",
  });
<<<<<<< HEAD
  // console.log(formData)
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const { sesion } = useAuth();
=======
// console.log(formData)
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const {sesion} = useAuth()
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/v1/empleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sesion.token}`,
        },
        body: JSON.stringify(formData),
      });
<<<<<<< HEAD
      console.log(formData);
      const data = await response.json();
      console.log(data);
=======
      console.log(formData)
      const data = await response.json();
      console.log(data)
>>>>>>> 884ce3979583d940959acf98706d299f9cdc7262
      if (response.ok) {
        setMensaje(data.message);
      } else {
        alert(data.message || "Hubo un error al agregar el empleado.");
      }
    } catch (error) {
      console.error("Error al agregar el empleado:", error);
      setError("Error al agregar el empleado.");
    }
  };

  return (
    <div>
      <h1>Agregar Nuevo Empleado</h1>
      {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Cargo:</label>
          <input
            type="text"
            name="cargo"
            value={formData.cargo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Salario:</label>
          <input
            type="number"
            name="salario"
            value={formData.salario}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Fecha de Contrato:</label>
          <input
            type="date"
            name="fecha_contrato"
            value={formData.fecha_contrato}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Nombre de Usuario:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Rol:</label>
          <select
            name="rol"
            value={formData.rol}
            onChange={handleChange}
            required
          >
            <option value="empleado">Empleado</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>

        <button type="submit">Agregar Empleado</button>
      </form>
    </div>
  );
};

export default AgregarEmpleado;
