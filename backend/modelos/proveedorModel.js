import { db } from "./mysql.js";

// proveedores
const proveedores = async () => {
  const sql = `SELECT * FROM proveedores `;
  const [result] = await db.execute(sql);
  return result;
};
const agregarProveedor = async (nombre, telefono, email, direccion) => {
  const sql = `CALL AgregarProveedor(?,?,?,?)`;
  const [result] = await db.execute(sql, [nombre, telefono, email, direccion]);
  return result;
};

const proveedorPorNombre = async (nombre) => {
  const sql = `SELECT id FROM proveedores WHERE nombre = ?`;
  const [result] = await db.execute(sql, [nombre]);
  return result[0].id || null;
};

const proveedorModel = {
  agregarProveedor,
  proveedorPorNombre,
  proveedores,
};

export default proveedorModel;
