import { useState } from "react";
import AgregarLibro from "../componentes/libro/AgregarLibro";
import ListaLibrosActivos from "../componentes/libro/TodosLosLibros";
import VerificarStock from "../componentes/libro/VerificarStock";
import RegistrarVenta from "../componentes/libro/RegistrarVentas";



const Libros = () => {
    const [refrescar, setRefrescar] = useState(false);
  
    const actualizarLibros = () => {
      setRefrescar((prev) => !prev); // Cambiar el estado para forzar un nuevo fetch en ListaLibrosActivos
    };
  
    return (
      <>
      <div style={{borderStyle: "inset"}}>
         {/* <AgregarLibro actualizarLibros={actualizarLibros} /> 
        <ListaLibrosActivos key={refrescar} />  */}
        </div>
        {/* <VerificarStock/> */}
        <RegistrarVenta/>
        </>
    );
  };

  export default Libros