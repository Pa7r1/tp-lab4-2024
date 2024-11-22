import bcrypt from "bcrypt";
import userModel from "../modelos/usuariosModelo.js";

const empleadosActivos = async (req, res) => {
  const empleados = await userModel.verEmpleadosActivos();
  res.send({ Empleados: empleados[0] });
};

const empleadosPorID = async (req, res) => {
  const id = req.params.id;
  const empleadoBuscado = await userModel.verEmpleadoPorId(id);
  res.send({ empleado: empleadoBuscado[0] });
};

const crearEmpleado = async (req, res) => {
  const { nombre, cargo, salario, fecha_contrato, username, password, rol } =
    req.body;

  const passwordHashed = await bcrypt.hash(password, 10);

  const nuevoEmpleado = await userModel.agregarEmpleado(
    nombre,
    cargo,
    salario,
    fecha_contrato,
    username,
    passwordHashed,
    rol
  );
  res.send({ newEmployee: nuevoEmpleado[0] });
};

const editarEmpleado = async (req, res) => {
  const empleado_id = req.params.empleado_id;
  const datosEmpleado = req.body;
  await userModel.actualizarEmpleado(empleado_id, datosEmpleado);
  res.send({ mensaje: "empleado actualizado con exito" });
};

const despedirEmpleado = async (req, res) => {
  const empleado_id = req.params.empleado_id;
  console.log(empleado_id);
  const despido = await userModel.deshabilitarEmpleado(empleado_id);
  res.send({ empleado_despedido: despido[0] });
};

const volverContrato = async (req, res) => {
  const empleado_id = req.params.empleado_id;
  const reContrato = await userModel.habilitarEmpleado(empleado_id);
  res.send({ contratado_nuevamente: reContrato[0] });
};
const userControl = {
  empleadosActivos,
  empleadosPorID,
  crearEmpleado,
  despedirEmpleado,
  volverContrato,
  editarEmpleado,
};
export default userControl;
