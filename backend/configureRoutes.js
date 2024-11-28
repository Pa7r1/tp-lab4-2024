import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

export const configureRoutes = (app, baseDir = "./controladores") => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const dir = path.resolve(__dirname, baseDir);

  fs.readdirSync(dir).forEach(async (file) => {
    const filePath = path.join(dir, file);

    if (fs.statSync(filePath).isFile() && filePath.endsWith(".js")) {
      const controllerModule = await import(pathToFileURL(filePath).href);
      const controller = controllerModule.default;

      if (controller) {
        const { name, prefix, ...methods } = controller;
        const router = express.Router();

        for (const [methodName, handler] of Object.entries(methods)) {
          let method;
          let url;
          switch (methodName) {
            //libros especiales
            case "librosActivos":
              method = "get";
              url = `/${name}`;
              break;
            case "librosInactivos":
              method = "get";
              url = `/${name}/borrados`;
              break;
            case "habilitarLibroN":
              method = "put";
              url = `/${name}/habilitar/:id`;
              break;

            //stock
            case "verStock":
              method = "get";
              url = `/${name}`;
            case "noMenos":
              method = "get";
              url = `/${name}/minimo`;

            //empleados
            case "empleadosActivos":
              method = "get";
              url = `/${name}`;
              break;
            case "volverContrato":
              method = "put";
              url = `/${name}/:id`;
              break;

            //ventas
            case "ventasHoy":
              method = "get";
              url = `/${name}`;
              break;
            case "ventas_fecha":
              method = "get";
              url = `/${name}`;
              break;
            case "ventas_fecha":
              method = "get";
              url = `/${name}`;
              break;
            case "ventas_fecha":
              method = "get";
              url = `/${name}`;
              break;
            case "librosFecha":
              method = "get";
              url = `/${name}`;
              break;

            case "gananciaDia":
              method = "get";
              url = `/${name}`;
              break;

            //comunes
            case "create":
              method = "post";
              url = `/${name}`;
              break;
            case "update":
              method = "put";
              url = `/${name}/:id`;
              break;
            case "delete":
              method = "delete";
              url = `/${name}/:id`;
              break;
            case "show":
              method = "get";
              url = `/${name}/:id`;
              break;
            case "search":
              method = "get";
              url = `/${name}/buscar`;
              break;
            default:
              throw new Error(`Método no reconocido: ${methodName}`);
          }

          router[method](prefix ? prefix + url : url, handler);
        }

        app.use("/api/v1", router);
      }
    }
  });
};
