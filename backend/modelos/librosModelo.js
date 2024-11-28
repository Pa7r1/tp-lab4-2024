import { db } from "./mysql.js";

const all = async () => {
  const sql = `CALL librosActivos()`;
  const [libros] = await db.execute(sql);
  return libros;
};

const allDelete = async () => {
  const sql = `SELECT * FROM libros WHERE activo = 0`;
  const [libros] = await db.execute(sql);
  return libros;
};

const agregarLibroNuevo = async (
  titulo,
  isbn,
  genero_nombre,
  autor_nombre,
  editorial_nombre,
  año,
  stock_icial,
  precio_venta,
  precio_alquiler
) => {
  const sql = `CALL AgregarLibroNuevo(?,?,?,?,?,?,?,?,?)`;
  const [newLibro] = await db.execute(sql, [
    titulo,
    isbn,
    genero_nombre,
    autor_nombre,
    editorial_nombre,
    año,
    stock_icial,
    precio_venta,
    precio_alquiler,
  ]);
  return newLibro;
};

const editarLibro = async (
  i_libro_id,
  i_titulo,
  i_genero_nombre,
  i_autor_nombre,
  i_editorial_nombre,
  i_año,
  i_precio_venta,
  i_precio_alquiler
) => {
  const sql = `CALL EditarLibro(?,?,?,?,?,?,?,?)`;
  const [newLibro] = await db.execute(sql, [
    i_libro_id,
    i_titulo,
    i_genero_nombre,
    i_autor_nombre,
    i_editorial_nombre,
    i_año,
    i_precio_venta,
    i_precio_alquiler,
  ]);
  return newLibro;
};

const eliminarLibro = async (id) => {
  const sql = `CALL deshabilitarLibro(?)`;
  const [result] = await db.execute(sql, [id]);
  return result;
};

const habilitarLibro = async (id) => {
  const sql = `CALL habilitarLibro(?)`;
  const [result] = await db.execute(sql, [id]);
  return result;
};

const busquedaAvanzada = async (i_titulo, i_autor_nombre, i_isbn) => {
  const sql = `CALL busquedaAvanzada(?,?,?)`;
  const [result] = await db.execute(sql, [i_titulo, i_autor_nombre, i_isbn]);
  return result;
};

const bookModel = {
  all,
  agregarLibroNuevo,
  editarLibro,
  eliminarLibro,
  habilitarLibro,
  busquedaAvanzada,
  allDelete,
};

export default bookModel;
