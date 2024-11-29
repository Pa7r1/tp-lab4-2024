import AgregarLibro from "../componentes/libro/AgregarLibro"
import LibrosMasVendidos from "../componentes/libro/ElMasVendido"
import RegistrarVenta from "../componentes/libro/RegistrarVentas"
import ListaLibrosActivos from "../componentes/libro/TodosLosLibros"

const Empleados = ()=>{
    return (
        <>
        <AgregarLibro/>
        <RegistrarVenta/>
        <ListaLibrosActivos/>
        <LibrosMasVendidos/>
        </>
    )
}

export default Empleados