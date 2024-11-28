import { db } from "./mysql.js";

const calculoControlStock = async (cantidad) => {
  const sql = `CALL librosConStockBajo(?)`;
  const [result] = await db.execute(sql, [cantidad]);
  return result;
};

const agregarStock = async (libro_id, provedor_id, cantidad, costo) => {
  const sql = `CALL AgregarStock(?,?,?,?)`;
  const [result] = await db.execute(sql, [
    libro_id,
    provedor_id,
    cantidad,
    costo,
  ]);
  return result;
};

const verificarMiStock = async () => {
  const sql = `CALL VerificarStockDisponible()`;
  const [result] = await db.execute(sql);
  return result;
};

const stockModel = {
  calculoControlStock,
  agregarStock,
  verificarMiStock,
};

export default stockModel;
