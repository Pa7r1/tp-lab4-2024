import { db } from "./mysql.js";

const todas = async () => {
  const sql = `CALL todasVentas()`;
  const [result] = await db.execute(sql);
  return result;
};

const registrarVenta = async (empleado_id, cliente_id, libro_id, cantidad) => {
  const sql = `CALL registrarVentasMultiple(?,?,?)`;
  const [result] = await db.execute(sql, [
    empleado_id,
    cliente_id,
    JSON.stringify(libros),
  ]);
  return [result];
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
