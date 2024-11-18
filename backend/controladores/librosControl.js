import bookModel from "../modelos/librosModelo.js";

const ventasDiarias = async (req, res) => {
  const fecha = req.query.fecha || new Date().toISOString().split("T")[0];
  const ventasDia = await bookModel.calculoVentasDiarias(fecha);
  res.send({ ventasDelDia: ventasDia[0] });
};

const libroMasVendido = async (req, res) => {
  const fehca_i = req.query.fecha_i;
  const fecha_f = req.query.fecha_f;
  const libro = await bookModel.calculoLibroMvendido(fehca_i, fecha_f);
  res.send({ El_Mas_Vendido: libro[0] });
};

const gananciaDiaria = async (req, res) => {
  const fecha = req.query.fecha || new Date().toISOString().split("T")[0];
  const gananciaDia = await bookModel.calculoGananciaDiaria(fecha);
  res.send({ gananciasDia: gananciaDia[0] });
};

const reporteVenta = async (req, res) => {
  const fecha_i = req.query.fecha_i;
  const fecha_f = req.query.fecha_f;
  const reporte = await bookModel.generarReporteVentas(fecha_i, fecha_f);
  res.send({ reportes: reporte[0] });
};

const controlStock = async (req, res) => {
  const cantidad = req.query.cantidad;
  const control = await bookModel.calculoControlStock(cantidad);
  res.send({ stock_disponible: control[0] });
};

const todos = async (req, res) => {
  const libros = await bookModel.all();
  res.send({ libros });
};

export const bookControl = {
  reporteVenta,
  ventasDiarias,
  libroMasVendido,
  gananciaDiaria,
  controlStock,
  todos,
};
