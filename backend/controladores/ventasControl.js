import ventasModel from "../modelos/ventasModelo.js";
import { validarJwt, validarRol } from "../middleware/authMiddleware.js";

const ventasDiarias = async (req, res) => {
  const fecha = req.query.fecha || new Date().toISOString().split("T")[0];
  const ventasDia = await ventasModel.calculoVentasDiarias(fecha);
  res.send({ ventasDelDia: ventasDia[0] });
};

const libroMasVendido = async (req, res) => {
  const fehca_i = req.query.fecha_i;
  const fecha_f = req.query.fecha_f;
  const libro = await ventasModel.calculoLibroMvendido(fehca_i, fecha_f);
  res.send({ El_Mas_Vendido: libro[0] });
};

const gananciaDiaria = async (req, res) => {
  const fecha = req.query.fecha || new Date().toISOString().split("T")[0];
  const gananciaDia = await ventasModel.calculoGananciaDiaria(fecha);
  res.send({ gananciasDia: gananciaDia[0] });
};

const reporteVenta = async (req, res) => {
  const fecha_i = req.query.fecha_i;
  const fecha_f = req.query.fecha_f;
  const reporte = await ventasModel.generarReporteVentas(fecha_i, fecha_f);
  res.send({ reportes: reporte[0] });
};
const nuevaVenta = async (req, res) => {
  const { empleado_id, cliente_id, libro_id, cantidad } = req.body;
  const venta = await ventasModel.registrarVenta(
    empleado_id,
    cliente_id,
    libro_id,
    cantidad
  );
  res.status(201).send({ nueva_venta: venta[0] });
};

const ventaControl = {
  name: "ventas",
  ventas_fecha: reporteVenta,
  create: nuevaVenta,
  ventasHoy: [validarJwt, validarRol("administrador"), ventasDiarias],
  librosFecha: [validarJwt, validarRol("administrador"), libroMasVendido],
  gananciaDia: [validarJwt, validarRol("administrador"), gananciaDiaria],
};
export default ventaControl;
