import { db } from "./mysql.js";

const calculoControlStock = async (cantidad) => {
  const sql = `CALL librosConStockBajo(?)`;
  const [result] = await db.execute(sql, [cantidad]);
  return result;
};

const agregarStock = async (libro_id, cantidad) => {
  const sql = `CALL AgregarStock(?,?)`;
  const [result] = await db.execute(sql, [libro_id, cantidad]);
  return result;
};

const reponerStockProvedor = async (provedor_id, libro_id, cantidad) => {
  const sql = `CALL reponerStockProveedor(?,?,?)`;
  const [result] = await db.execute(sql, [provedor_id, libro_id, cantidad]);
  return result;
};

const stockDisponible = async () => {
  const sql = `CALL VerificarStockDisponible`;
  const [result] = await db.execute(sql);
  return result;
};

const stockModel = {
  calculoControlStock,
  agregarStock,
  reponerStockProvedor,
  stockDisponible,
};

export default stockModel;
