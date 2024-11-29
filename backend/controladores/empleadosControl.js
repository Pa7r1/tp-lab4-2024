import bcrypt from "bcrypt";
import userModel from "../modelos/usuariosModelo.js";
import { validarJwt, validarRol } from "../middleware/authMiddleware.js";

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
  try {
    const { nombre, cargo, salario, fecha_contrato, username, password } =
      req.body;
    if (req.user.rol !== "administrador") {
      return res.status(403).send({ mensaje: "Acceso denegado." });
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    const nuevoEmpleado = await userModel.agregarEmpleado(
      nombre,
      cargo,
      salario,
      fecha_contrato,
      username,
      passwordHashed,
      "empleado"
    );

    res.status(201).send({
      mensaje: "Empleado creado exitosamente.",
      Empleado: nuevoEmpleado[0],
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ mensaje: "Error al crear el empleado.", error: error.message });
  }
};

const editarEmpleado = async (req, res) => {
  const id = req.params.id;
  const datosEmpleado = req.body;
  await userModel.actualizarEmpleado(id, datosEmpleado);
  res.send({ mensaje: "empleado actualizado con exito" });
};

const despedirEmpleado = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const despido = await userModel.deshabilitarEmpleado(id);
  res.send({ despedido: despido[0] });
};
const empleadoInactivo = async (req, res) => {
  const empleados = await userModel.exEmpleados();
  res.status(200).send({ DESPEDIDOS: empleados[0] });
};

const volverContrato = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const reContrato = await userModel.habilitarEmpleado(id);
  res.send({ contratado_nuevamente: reContrato[0] });
};
export default {
  name: "empleados",
  exEmpleados: [validarJwt, validarRol("administrador"), empleadoInactivo],
  empleadosActivos: [validarJwt, validarRol("administrador"), empleadosActivos],
  show: [validarJwt, validarRol("administrador"), empleadosPorID],
  create: [validarJwt, validarRol("administrador"), crearEmpleado],
  update: [validarJwt, validarRol("administrador"), editarEmpleado],
  delete: [validarJwt, validarRol("administrador"), despedirEmpleado],
  volverContrato: [validarJwt, validarRol("administrador"), volverContrato],
};
