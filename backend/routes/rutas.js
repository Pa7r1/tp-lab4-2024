import express from "express";
import { bookControl } from "../controladores/librosControl.js";
import userControl from "../controladores/empleadosControl.js";
import login from "../controladores/auth.js";
import { validarJwt, validarRol } from "../middleware/authMiddleware.js";

const Router = express.Router();
Router.get("/ventas-diarias", bookControl.ventasDiarias);
Router.get("/control-stock", bookControl.controlStock);
Router.get("/el-mas-vendido", bookControl.libroMasVendido);
Router.get("/reporte-venta", bookControl.reporteVenta); //agregar fecha a este registro en la respuesta json
Router.get("/ganancias-diaria", bookControl.gananciaDiaria);
Router.get("/todos", bookControl.todos);
Router.post("/nueva-venta", bookControl.nuevaVenta);

// usuarios-empleados
Router.post("/login", login);
Router.get(
  "/empleados",
  validarJwt,
  validarRol("administrador"),
  userControl.empleadosActivos
);
Router.get(
  "/empleado/:id",
  validarJwt,
  validarRol("administrador"),
  userControl.empleadosPorID
);
Router.post(
  "/nuevo-empleado",
  validarJwt,
  validarRol("administrador"),
  userControl.crearEmpleado
);
Router.put(
  "/recontratacion-empleado/:empleado_id",
  validarJwt,
  validarRol("administrador"),
  userControl.volverContrato
);
Router.put(
  "/editar-empleado/:empleado_id",
  validarJwt,
  validarRol("administrador"),
  userControl.editarEmpleado
);
Router.delete(
  "/despedir-empleado/:empleado_id",
  validarJwt,
  validarRol("administrador"),
  userControl.despedirEmpleado
);

export default Router;
