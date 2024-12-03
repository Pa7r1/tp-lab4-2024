import { useState } from "react";
import AgregarEmpleado from "../componentes/empleados/AgregarEmpleado";
import EmpleadosActivos from "../componentes/empleados/EmpleadosActivos";

const AdministrarEmpleados = () => {
  const { refrescar, setRefrescar } = useState(false);
  const actualizar = () => {
    setRefrescar((prev) => !prev);
  };

  return (
    <>
      <AgregarEmpleado actualizar={actualizar} />
      <EmpleadosActivos refrescar={refrescar} />
    </>
  );
};
export default AdministrarEmpleados;
