import { db } from "./mysql.js";

// usuarios
const usuarios = async (username) => {
  const sql = `SELECT * FROM usuarios WHERE username = ?`;
  const [result] = await db.execute(sql, [username]);
  return result;
};

// empleados
const agregarEmpleado = async (
  nombre,
  cargo,
  salario,
  fecha_contrato,
  username,
  password,
  rol
) => {
  const sql = `CALL AgregarEmpleado(?,?,?,?,?,?,?)`;
  const [result] = await db.execute(sql, [
    nombre,
    cargo,
    salario,
    fecha_contrato,
    username,
    password,
    rol,
  ]);
  return result;
};

const verEmpleadosActivos = async () => {
  const sql = `CALL verEmpleadosActivos()`;
  const [result] = await db.execute(sql);
  return result;
};

const verEmpleadoPorId = async (id) => {
  const sql = `CALL empleadoPorId(?)`;
  const [result] = await db.execute(sql, [id]);
  return result;
};

const actualizarEmpleado = async (id, datosEmpleado) => {
  const { nombre, cargo, salario, fecha_contratacion } = datosEmpleado;
  const sql = `UPDATE empleados SET nombre = ?, cargo = ?, salario = ?, fecha_contratacion = ? WHERE id = ?`;
  const [result] = await db.execute(sql, [
    nombre,
    cargo,
    salario,
    fecha_contratacion,
    id,
  ]);
  return result;
};

const deshabilitarEmpleado = async (id) => {
  const sql = `CALL deshabilitarEmpleado(?)`;
  const [result] = await db.execute(sql, [id]);
  return result;
};

const habilitarEmpleado = async (id) => {
  const sql = `CALL habilitarEmpleado(?)`;
  const [result] = await db.execute(sql, [id]);
  return result;
};

const exEmpleados = async () => {
  const sql = `CALL verEmpleadosInactivos()`;
  const [result] = await db.execute(sql);
  return result;
};

const userModel = {
  usuarios,
  agregarEmpleado,
  verEmpleadosActivos,
  verEmpleadoPorId,
  actualizarEmpleado,
  deshabilitarEmpleado,
  habilitarEmpleado,
  exEmpleados,
};

export default userModel;
