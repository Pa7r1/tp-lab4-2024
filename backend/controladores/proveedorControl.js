import proveedorModel from "../modelos/proveedorModel.js";
import { validarJwt, validarRol } from "../middleware/authMiddleware.js";
import {
  validarCrearProveedor,
  verificarValidaciones,
} from "../middleware/validaciones.js";

const verProveedores = async (req, res) => {
  const proveedores = await proveedorModel.proveedores();
  res.status(200).send({ PROVEDORES: proveedores });
};
const nuevoProveedor = async (req, res) => {
  const { nombre, telefono, email, direccion } = req.body;
  const [newProveedor] = await proveedorModel.agreagarProveedor(
    nombre,
    telefono,
    email,
    direccion
  );
  res.status(201).send({ proveedor_nuevo: newProveedor[0] });
};

export default {
  name: "proveedor",
  create: [
    validarJwt,
    validarRol("administrador"),
    validarCrearProveedor(),
    verificarValidaciones,
    nuevoProveedor,
  ],
  verProvedor: [validarJwt, validarRol("administrador"), verProveedores],
};
