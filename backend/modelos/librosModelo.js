import { db } from "./mysql.js";

const registrarVenta = async (empleado_id, cliente_id, detalles) => {
  const sql = `CALL registrarVenta(?, ?, ?)`;
  const [result] = await db.execute(sql, [
    empleado_id,
    cliente_id,
    JSON.stringify(detalles),
  ]);
  return [result];
};

const calculoLibroMvendido = async (fecha_i, fecha_f) => {
  const sql = `CALL obtenerLibrosMasVendidos(?,?)`;
  const [result] = await db.execute(sql, [fecha_i, fecha_f]);
  return result;
};

const all = async () => {
  const sql = `SELECT * FROM libros`;
  const [libros] = await db.execute(sql);
  return libros;
};

const calculoControlStock = async (cantidad) => {
  const sql = `CALL librosConStockBajo(?)`;
  const [result] = await db.execute(sql, [cantidad]);
  return result;
};

const calculoVentasDiarias = async (fecha) => {
  const sql = `CALL calcularVentasDiarias(?)`;
  const [result] = await db.execute(sql, [fecha]);
  return result;
};

const calculoGananciaDiaria = async (fecha) => {
  const sql = `CALL calcularGananciasDiarias (?)`;
  const [result] = await db.execute(sql, [fecha]);
  return result;
};

const generarReporteVentas = async (fecha_i, fecha_f) => {
  const sql = `CALL generarReporteVentas(?,?)`;
  const [result] = await db.execute(sql, [fecha_i, fecha_f]);
  return result;
};

const bookModel = {
  calculoVentasDiarias,
  generarReporteVentas,
  calculoGananciaDiaria,
  calculoControlStock,
  calculoLibroMvendido,
  all,
};

export default bookModel;
