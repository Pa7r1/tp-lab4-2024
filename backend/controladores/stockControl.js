import proveedorModel from "../modelos/proveedorModel.js";
import stockModel from "../modelos/stockModelo.js";

const libroStockBajo = async (req, res) => {
  const cantidad = req.query.cantidad;
  const [libro] = await stockModel.calculoControlStock(cantidad);
  res.send({ stock_disponible: libro[0] });
};

const agregarStock = async (req, res) => {
  const libro_id = req.params.libro_id;
  const { nombre_proveedor, cantidad, costo_compra } = req.body;

  const proveedor_id = await proveedorModel.proveedorPorNombre(
    nombre_proveedor
  );

  if (!proveedor_id) {
    return res
      .status(400)
      .send({ error: "El proveedor especificado no existe." });
  }

  const [libroAgregado] = await stockModel.agregarStock(
    libro_id,
    proveedor_id,
    cantidad,
    costo_compra
  );

  res.status(200).send({
    mensaje: "Stock actualizado exitosamente",
    stock_actualizado: libroAgregado[0],
  });
};
const stockControl = { libroStockBajo, agregarStock };

export default stockControl;
