import { db } from "./mysql.js";

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
  const sql = `SELECT e.id, e.nombre, e.cargo, e.salario, e.fecha_contratacion, u.username, u.rol
   FROM empleados e 
   INNER JOIN usuarios u ON e.id = u.empleado_id
   WHERE activo = 1`;
  const [result] = await db.execute(sql);
  return result;
};

const verEmpleadoPorId = async (id) => {
  const sql = `SELECT e.id, e.nombre, e.cargo, e.salario, e.fecha_contratacion, u.username, u.rol
   FROM empleados e 
   INNER JOIN usuarios u ON e.id = u.empleado_id
   WHERE e.id = ?`;
  const [result] = await db.execute(sql, [id]);
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

const deshabilitarEmpleado = async (empleado_id) => {
  const sql = `CALL deshabilitarEmpleado(?)`;
  const [result] = await db.execute(sql, [empleado_id]);
  return result;
};

const habilitarEmpleado = async (empleado_id) => {
  const sql = `CALL habilitarEmpleado(?)`;
  const [result] = await db.execute(sql, [empleado_id]);
  return result;
};

const employeModel = {
  agregarEmpleado,
  verEmpleadosActivos,
  verEmpleadoPorId,
  actualizarEmpleado,
  deshabilitarEmpleado,
  habilitarEmpleado,
};

export default employeModel;
