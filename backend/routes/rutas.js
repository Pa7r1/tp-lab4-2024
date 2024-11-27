import express from "express";
import { bookControl } from "../controladores/librosControl.js";
import userControl from "../controladores/empleadosControl.js";
import login from "../controladores/auth.js";
import { validarJwt, validarRol } from "../middleware/authMiddleware.js";
import ventaControl from "../controladores/ventasControl.js";
import proveedorControl from "../controladores/proveedorControl.js";
import stockControl from "../controladores/stockControl.js";

const Router = express.Router();

//libros
Router.get("/todos", bookControl.todos);
Router.post("/agregar-libro", bookControl.nuevoLibro);
Router.put("/editar-libro/:libro_id", bookControl.editLibro); //agregar funcion para editar libro

//stock
Router.get("/control-stock", stockControl.libroStockBajo); // busca los libros con el stock que le indiques
Router.put("/agregar-stock/:libro_id", stockControl.agregarStock); // agrega stock indicando el libro y su proveedor

//ventas
Router.get(
  "/ventas-diarias",
  validarJwt,
  validarRol("administrador"),
  ventaControl.ventasDiarias
);
Router.get(
  "/el-mas-vendido",
  validarJwt,
  validarRol("administrador"),
  ventaControl.libroMasVendido
);
Router.get("/reporte-venta", ventaControl.reporteVenta); //agregar fecha a este registro en la respuesta json
Router.get(
  "/ganancias-diaria",
  validarJwt,
  validarRol("administrador"),
  ventaControl.gananciaDiaria
);
Router.post("/nueva-venta", ventaControl.nuevaVenta);

//proveedores
Router.post(
  "/nuevo-proovedor",
  validarJwt,
  validarRol("administrador"),
  proveedorControl.nuevoProveedor
);

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
