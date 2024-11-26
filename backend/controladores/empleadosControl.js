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
  try {
    const { nombre, cargo, salario, fecha_contrato, username, password } =
      req.body;

    // Validar que el usuario actual sea admin
    if (req.user.rol !== "administrador") {
      return res.status(403).send({ mensaje: "Acceso denegado." });
    }

    // Hashear la contraseña
    const passwordHashed = await bcrypt.hash(password, 10);

    // Crear empleado
    const nuevoEmpleado = await userModel.agregarEmpleado(
      nombre,
      cargo,
      salario,
      fecha_contrato,
      username,
      passwordHashed,
      "empleado" // Rol fijo para empleados
    );

    res
      .status(201)
      .send({ mensaje: "Empleado creado exitosamente.", nuevoEmpleado });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ mensaje: "Error al crear el empleado.", error: error.message });
  }
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
