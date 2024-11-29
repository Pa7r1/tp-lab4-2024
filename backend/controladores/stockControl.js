import {
  validarAgregarStock,
  validarLibroStockBajo,
  verificarValidaciones,
} from "../middleware/validaciones.js";
import proveedorModel from "../modelos/proveedorModel.js";
import stockModel from "../modelos/stockModelo.js";

const stockDisponible = async (req, res) => {
  const stock = await stockModel.verificarMiStock();
  res.status(200).send({ Stock_disoponible: stock[0] });
};
const libroStockBajo = async (req, res) => {
  const cantidad = req.query.cantidad;
  const [libro] = await stockModel.calculoControlStock(cantidad);
  res.send({ stock_disponible: libro });
};

const agregarStock = async (req, res) => {
  const id = req.params.id;
  const { nombre_proveedor, cantidad, costo_compra } = req.body;

  const proveedor_id = await proveedorModel.proveedorPorNombre(
    nombre_proveedor
  );

  if (!proveedor_id) {
    return res
      .status(400)
      .send({ error: "El proveedor especificado no existe. " });
  }
  const [libroAgregado] = await stockModel.agregarStock(
    id,
    proveedor_id,
    cantidad,
    costo_compra
  );

  res.status(200).send({
    mensaje: "Stock actualizado exitosamente",
    stock_actualizado: libroAgregado[0],
  });
};

export default {
  name: "stock",
  noMenos: [validarLibroStockBajo(), verificarValidaciones, libroStockBajo],
  update: [validarAgregarStock(), verificarValidaciones, agregarStock],
  verStock: stockDisponible,
};
