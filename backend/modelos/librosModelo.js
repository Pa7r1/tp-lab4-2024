import { db } from "./mysql.js";

const all = async () => {
  const sql = `SELECT * FROM libros`;
  const [libros] = await db.execute(sql);
  return libros;
};

const agregarLibroNuevo = async (
  titulo,
  genero_nombre,
  autor_nombre,
  editorial_nombre,
  año,
  stock_icial,
  precio_venta,
  precio_alquiler
) => {
  const sql = `CALL AgregarLibroNuevo(?,?,?,?,?,?,?,?)`;
  const [newLibro] = await db.execute(sql, [
    titulo,
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

const bookModel = {
  all,
  agregarLibroNuevo,
  editarLibro,
};

export default bookModel;
