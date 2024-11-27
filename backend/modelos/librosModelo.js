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
  stock_inicial,
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
    stock_inicial,
    precio_venta,
    precio_alquiler,
  ]);
  return newLibro;
};

const bookModel = {
  all,
  agregarLibroNuevo,
};

export default bookModel;
