import { db } from "./mysql.js";

const todas = async (offset, limit) => {
  const sql = `CALL obtenerVentas(?, ?)`;
  const [results] = await db.execute(sql, [offset, limit]);
  const detallesVentas = results[0];
  const totalVentas = results[1][0].total_ventas;

  return {
    detallesVentas,
    totalVentas,
  };
};

const registrarVenta = async (empleado_id, cliente_id, libros) => {
  const librosJson = JSON.stringify(libros);
  const sql = `CALL registrarVentasMultiple(?,?,?)`;
  const [result] = await db.execute(sql, [empleado_id, cliente_id, librosJson]);
  return result;
};

const calculoLibroMvendido = async (fecha_i, fecha_f) => {
  const sql = `CALL obtenerLibrosMasVendidos(?,?)`;
  const [result] = await db.execute(sql, [fecha_i, fecha_f]);
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

const ventasModel = {
  calculoVentasDiarias,
  generarReporteVentas,
  calculoGananciaDiaria,
  calculoLibroMvendido,
  registrarVenta,
  todas,
};

export default ventasModel;
