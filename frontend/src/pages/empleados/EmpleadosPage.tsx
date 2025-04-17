import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./EmpleadosPage.module.css";

const API_URL = "http://localhost:3000/api/v1/empleados";

interface Empleado {
  id: number;
  nombre: string;
  cargo: string;
  salario: number;
  fecha_contrato: string;
  username: string;
  estado: string;
}

const Empleados = () => {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [exEmpleados, setExEmpleados] = useState<Empleado[]>([]);
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    nombre: "",
    cargo: "",
    salario: "",
    fecha_contrato: "",
    username: "",
    password: "",
  });
  const [empleadoEditando, setEmpleadoEditando] = useState<Empleado | null>(
    null
  );
  const [error, setError] = useState("");

  useEffect(() => {
    cargarEmpleadosActivos();
    cargarExEmpleados();
  }, []);

  const cargarEmpleadosActivos = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEmpleados(res.data.Empleados);
    } catch (err) {
      setError("Error al cargar los empleados activos");
    }
  };

  const cargarExEmpleados = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/despedidos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExEmpleados(res.data.DESPEDIDOS);
    } catch (err) {
      setError("Error al cargar los ex empleados");
    }
  };

  const agregarEmpleado = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const { nombre, cargo, salario, fecha_contrato, username, password } =
        nuevoEmpleado;

      console.log(nuevoEmpleado);
      const response = await axios.post(
        `${API_URL}`,
        {
          nombre,
          cargo,
          salario: Number(salario),
          fecha_contrato,
          username,
          password,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response);

      setNuevoEmpleado({
        nombre: "",
        cargo: "",
        salario: "",
        fecha_contrato: "",
        username: "",
        password: "",
      });
      cargarEmpleadosActivos();
    } catch (err) {
      setError(
        "Error al agregar el empleado. Verifica los datos e intenta nuevamente."
      );
      console.error("Error detallado:", err.response?.data || err.message);
    }
  };

  const editarEmpleado = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!empleadoEditando) return;

    try {
      const token = localStorage.getItem("token");
      const { id, nombre, cargo, salario, fecha_contrato } = empleadoEditando;

      await axios.put(
        `${API_URL}/${id}`,
        {
          nombre,
          cargo,
          salario,
          fecha_contratacion: fecha_contrato,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEmpleadoEditando(null);
      cargarEmpleadosActivos();
    } catch (err) {
      setError("Error al editar el empleado");
      console.error(err);
    }
  };

  const despedirEmpleado = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      cargarEmpleadosActivos();
      cargarExEmpleados();
    } catch (err) {
      setError("Error al despedir al empleado");
    }
  };

  const recontratarEmpleado = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/habilitar/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      cargarEmpleadosActivos();
      cargarExEmpleados();
    } catch (err) {
      setError("Error al recontratar al empleado");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Gestión de Empleados</h1>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      {/* Tabla de empleados activos */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Empleados Activos</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Salario</th>
              <th>Fecha Contrato</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.nombre}</td>
                <td>{empleado.cargo}</td>
                <td>${empleado.salario}</td>
                <td>
                  {new Date(empleado.fecha_contrato).toLocaleDateString()}
                </td>
                <td>{empleado.username}</td>
                <td>
                  <button
                    onClick={() => setEmpleadoEditando(empleado)}
                    className={`${styles.button} ${styles.buttonSecondary} ${styles.actionButton}`}
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => despedirEmpleado(empleado.id)}
                    className={`${styles.button} ${styles.buttonDanger} ${styles.actionButton}`}
                  >
                    Despedir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Tabla de ex empleados */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Ex Empleados</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Salario</th>
              <th>Fecha Contrato</th>
              <th>Usuario</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {exEmpleados.map((empleado) => (
              <tr key={empleado.id}>
                <td>{empleado.nombre}</td>
                <td>{empleado.cargo}</td>
                <td>${empleado.salario}</td>
                <td>
                  {new Date(empleado.fecha_contrato).toLocaleDateString()}
                </td>
                <td>{empleado.username}</td>
                <td>
                  <button
                    onClick={() => recontratarEmpleado(empleado.id)}
                    className={`${styles.button} ${styles.buttonSecondary} ${styles.actionButton}`}
                  >
                    Recontratar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Formulario para agregar un nuevo empleado */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Agregar Nuevo Empleado</h2>
        <form onSubmit={agregarEmpleado} className={styles.addForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre Completo</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Nombre del empleado"
              value={nuevoEmpleado.nombre}
              onChange={(e) =>
                setNuevoEmpleado({ ...nuevoEmpleado, nombre: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Cargo</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Cargo/Puesto"
              value={nuevoEmpleado.cargo}
              onChange={(e) =>
                setNuevoEmpleado({ ...nuevoEmpleado, cargo: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Salario</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Salario en $"
              value={nuevoEmpleado.salario}
              onChange={(e) =>
                setNuevoEmpleado({ ...nuevoEmpleado, salario: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Fecha de Contrato</label>
            <input
              type="date"
              className={styles.input}
              value={nuevoEmpleado.fecha_contrato}
              onChange={(e) =>
                setNuevoEmpleado({
                  ...nuevoEmpleado,
                  fecha_contrato: e.target.value,
                })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nombre de Usuario</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Nombre de usuario para login"
              value={nuevoEmpleado.username}
              onChange={(e) =>
                setNuevoEmpleado({
                  ...nuevoEmpleado,
                  username: e.target.value,
                })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Contraseña</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Contraseña"
              value={nuevoEmpleado.password}
              onChange={(e) =>
                setNuevoEmpleado({
                  ...nuevoEmpleado,
                  password: e.target.value,
                })
              }
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Agregar Empleado
          </button>
        </form>
      </section>

      {/* Modal para editar empleado */}
      {empleadoEditando && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Editar Empleado</h2>
            <form onSubmit={editarEmpleado}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nombre</label>
                <input
                  type="text"
                  className={styles.input}
                  value={empleadoEditando.nombre}
                  onChange={(e) =>
                    setEmpleadoEditando({
                      ...empleadoEditando,
                      nombre: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Cargo</label>
                <input
                  type="text"
                  className={styles.input}
                  value={empleadoEditando.cargo}
                  onChange={(e) =>
                    setEmpleadoEditando({
                      ...empleadoEditando,
                      cargo: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Salario</label>
                <input
                  type="number"
                  className={styles.input}
                  value={empleadoEditando.salario}
                  onChange={(e) =>
                    setEmpleadoEditando({
                      ...empleadoEditando,
                      salario: Number(e.target.value),
                    })
                  }
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label}>Fecha Contrato</label>
                <input
                  type="date"
                  className={styles.input}
                  value={empleadoEditando.fecha_contrato.split("T")[0]}
                  onChange={(e) =>
                    setEmpleadoEditando({
                      ...empleadoEditando,
                      fecha_contrato: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className={styles.buttonGroup}>
                <button type="submit" className={styles.button}>
                  Guardar Cambios
                </button>
                <button
                  type="button"
                  className={`${styles.button} ${styles.buttonDanger}`}
                  onClick={() => setEmpleadoEditando(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Empleados;
