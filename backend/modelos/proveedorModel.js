import { db } from "./mysql.js";

// proveedores
const agreagarProveedor = async (nombre, telefono, email, direccion) => {
  const sql = `CALL AgregarProveedor(?,?,?,?)`;
  const [result] = await db.execute(sql, [nombre, telefono, email, direccion]);
  return result;
};

const proveedorPorNombre = async (nombre) => {
  const sql = `SELECT id FROM proveedores WHERE nombre = ?`;
  const [result] = await db.execute(sql, [nombre]);
  return result[0].id || null;
};

const reponerStockProvedor = async (provedor_id, libro_id, cantidad) => {
  const sql = `CALL reponerStockProveedor(?,?,?)`;
  const [result] = await db.execute(sql, [provedor_id, libro_id, cantidad]);
  return result;
};

const proveedorModel = {
  agreagarProveedor,
  proveedorPorNombre,
  reponerStockProvedor,
};

export default proveedorModel;
