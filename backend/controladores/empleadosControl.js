import employeModel from "../modelos/empleadosModelo.js";

const crearEmpleado = async (req, res) => {
  const { nombre, cargo, salario, fecha_contrato, username, password, rol } =
    req.body;
};
