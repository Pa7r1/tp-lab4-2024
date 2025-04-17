import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./LibrosPage.module.css";
const API_URL = "http://localhost:3000/api/v1/libros";

const LibrosPage = () => {
  const [libros, setLibros] = useState([]);
  const [busqueda, setBusqueda] = useState({
    titulo: "",
    autor_nombre: "",
    isbn: "",
  });
  const [nuevoLibro, setNuevoLibro] = useState({
    titulo: "",
    isbn: "",
    genero_nombre: "",
    autor_nombre: "",
    editorial_nombre: "",
    año: "",
    stock_inicial: "",
    precio_venta: "",
    precio_alquiler: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    cargarLibros();
  }, []);

  const cargarLibros = async () => {
    try {
      const res = await axios.get(API_URL);
      setLibros(res.data.LIBROS);
    } catch (err) {
      setError("Error al cargar los libros");
    }
  };

  const buscarLibros = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}/buscar`, { params: busqueda });
      setLibros(res.data.libros_buscados);
    } catch (err) {
      setError("Error al buscar libros");
    }
  };

  const agregarLibro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.log("no se encontro el token");
      } else {
        console.log(token);
      }

      await axios.post(API_URL, nuevoLibro, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setNuevoLibro({
        titulo: "",
        isbn: "",
        genero_nombre: "",
        autor_nombre: "",
        editorial_nombre: "",
        año: "",
        stock_inicial: "",
        precio_venta: "",
        precio_alquiler: "",
      });
      cargarLibros();
    } catch (err) {
      setError("Error al agregar el libro");
    }
  };

  const deshabilitarLibro = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      cargarLibros();
    } catch (err) {
      setError("Error al deshabilitar el libro");
    }
  };

  const habilitarLibro = async (id: number) => {
    try {
      await axios.put(
        `${API_URL}/habilitar/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      cargarLibros();
    } catch (err) {
      setError("Error al habilitar el libro");
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Gestión de Libros</h1>
      </header>

      {error && <div className={styles.error}>{error}</div>}

      {/* Formulario de búsqueda */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Buscar Libros</h2>
        <form onSubmit={buscarLibros} className={styles.searchForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Título</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ej: Cien años de soledad"
              value={busqueda.titulo}
              onChange={(e) =>
                setBusqueda({ ...busqueda, titulo: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Autor</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ej: Gabriel García Márquez"
              value={busqueda.autor_nombre}
              onChange={(e) =>
                setBusqueda({ ...busqueda, autor_nombre: e.target.value })
              }
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>ISBN</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Ej: 9780307474728"
              value={busqueda.isbn}
              onChange={(e) =>
                setBusqueda({ ...busqueda, isbn: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Buscar Libros
          </button>
        </form>
      </section>

      {/* Tabla de libros */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Listado de Libros</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Título</th>
              <th>Autor</th>
              <th>ISBN</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro: any) => (
              <tr key={libro.id}>
                <td>{libro.titulo}</td>
                <td>{libro.autor}</td>
                <td>{libro.isbn}</td>
                <td>
                  <button
                    onClick={() => deshabilitarLibro(libro.id)}
                    className={`${styles.button} ${styles.buttonDanger} ${styles.actionButton}`}
                  >
                    Deshabilitar
                  </button>
                  <button
                    onClick={() => habilitarLibro(libro.id)}
                    className={`${styles.button} ${styles.buttonSecondary} ${styles.actionButton}`}
                  >
                    Habilitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Formulario para agregar un nuevo libro */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Agregar Nuevo Libro</h2>
        <form onSubmit={agregarLibro} className={styles.addBookForm}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Título</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Título del libro"
              value={nuevoLibro.titulo}
              onChange={(e) =>
                setNuevoLibro({ ...nuevoLibro, titulo: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>ISBN</label>
            <input
              type="text"
              className={styles.input}
              placeholder="ISBN del libro"
              value={nuevoLibro.isbn}
              onChange={(e) =>
                setNuevoLibro({ ...nuevoLibro, isbn: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Género</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Género literario"
              value={nuevoLibro.genero_nombre}
              onChange={(e) =>
                setNuevoLibro({ ...nuevoLibro, genero_nombre: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Autor</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Nombre del autor"
              value={nuevoLibro.autor_nombre}
              onChange={(e) =>
                setNuevoLibro({ ...nuevoLibro, autor_nombre: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Editorial</label>
            <input
              type="text"
              className={styles.input}
              placeholder="Editorial"
              value={nuevoLibro.editorial_nombre}
              onChange={(e) =>
                setNuevoLibro({
                  ...nuevoLibro,
                  editorial_nombre: e.target.value,
                })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Año de publicación</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Ej: 2023"
              value={nuevoLibro.año}
              onChange={(e) =>
                setNuevoLibro({ ...nuevoLibro, año: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Stock inicial</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Cantidad disponible"
              value={nuevoLibro.stock_inicial}
              onChange={(e) =>
                setNuevoLibro({ ...nuevoLibro, stock_inicial: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Precio de venta</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Precio en $"
              value={nuevoLibro.precio_venta}
              onChange={(e) =>
                setNuevoLibro({ ...nuevoLibro, precio_venta: e.target.value })
              }
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Precio de alquiler</label>
            <input
              type="number"
              className={styles.input}
              placeholder="Precio en $"
              value={nuevoLibro.precio_alquiler}
              onChange={(e) =>
                setNuevoLibro({
                  ...nuevoLibro,
                  precio_alquiler: e.target.value,
                })
              }
              required
            />
          </div>

          <button type="submit" className={styles.button}>
            Agregar Libro
          </button>
        </form>
      </section>
    </div>
  );
};

export default LibrosPage;
