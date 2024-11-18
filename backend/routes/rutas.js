import express from "express";
import { bookControl } from "../controladores/librosControl.js";

const Router = express.Router();
Router.get("/ventas-diarias", bookControl.ventasDiarias);
Router.get("/control-stock", bookControl.controlStock);
Router.get("/el-mas-vendido", bookControl.libroMasVendido);
Router.get("/reporte-venta", bookControl.reporteVenta); //agregar fecha a este registro en la respuesta json
Router.get("/ganancias-diaria", bookControl.gananciaDiaria);
Router.get("/todos", bookControl.todos);
export default Router;
