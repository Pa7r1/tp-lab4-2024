import proveedorModel from "../modelos/proveedorModel.js";

const nuevoProveedor = async (req, res) => {
  const { nombre, telefono, email, direccion } = req.body;
  const [newProveedor] = await proveedorModel.agreagrProveedor(
    nombre,
    telefono,
    email,
    direccion
  );
  res.status(201).send({ proveedor_nuevo: newProveedor[0] });
};

const proveedorControl = {
  nuevoProveedor,
};

export default proveedorControl;
