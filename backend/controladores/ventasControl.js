import ventasModel from "../modelos/ventasModelo.js";
import { validarJwt, validarRol } from "../middleware/authMiddleware.js";

const ventas = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const { detallesVentas, totalVentas } = await ventasModel.todas(
    offset,
    parseInt(limit)
  );

  const totalPages = Math.ceil(totalVentas / limit);

  res.status(200).send({
    VENTAS: detallesVentas,
    paginacion: {
      totalVentas,
      currentPage: parseInt(page),
      totalPages,
      limit: parseInt(limit),
    },
  });
};

const ventasDiarias = async (req, res) => {
  const fecha = req.query.fecha;
  let hoy = new Date().toISOString().split("T")[0];
  if (fecha) {
    const ventasDia = await ventasModel.calculoVentasDiarias(fecha);
    res.send({ ventasDelDia: ventasDia[0] });
  } else {
    const ventasDia = await ventasModel.calculoVentasDiarias(hoy);
    res.send({ ventasDelDia: ventasDia[0] });
  }
};

const libroMasVendido = async (req, res) => {
  const fehca_i = req.query.fecha_i;
  const fecha_f = req.query.fecha_f;

  let hoy = new Date();
  let hoyMenosTres = new Date(hoy.getTime() - 3 * 24 * 60 * 60 * 1000);

  let fechaActual = hoy.toISOString().split("T")[0];
  let fechaRestada = hoyMenosTres.toISOString().split("T")[0];

  if (fehca_i && fecha_f) {
    const libro = await ventasModel.calculoLibroMvendido(fehca_i, fecha_f);
    res.send({ El_Mas_Vendido: libro[0] });
  } else {
    const libro = await ventasModel.calculoLibroMvendido(
      fechaRestada,
      fechaActual
    );
    res.send({ El_Mas_Vendido: libro[0] });
  }
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
  const { empleado_id, cliente_id, libros } = req.body;
  const venta = await ventasModel.registrarVenta(
    empleado_id,
    cliente_id,
    libros
  );
  res.status(201).send({ nueva_venta: venta[0] });
};

const ventaControl = {
  name: "ventas",
  todasventas: [validarJwt, validarRol("administrador"), ventas],
  ventas_fecha: reporteVenta,
  create: nuevaVenta,
  ventasHoy: [validarJwt, validarRol("administrador"), ventasDiarias],
  librosFecha: [validarJwt, validarRol("administrador"), libroMasVendido],
  gananciaDia: [validarJwt, validarRol("administrador"), gananciaDiaria],
};
export default ventaControl;
