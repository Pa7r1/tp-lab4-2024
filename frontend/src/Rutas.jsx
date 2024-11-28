import {Routes, Route} from "react-router-dom"
import Layout from "../src/pages/Layout";
import Empleados from "../src/pages/Empleados";
import Default from "../src/pages/Default";
import Home from "../src/pages/Home";
import Inicio from "../src/pages/Inicio";
import { Container } from "@mui/material";
import NavBar from "../src/componentes/navbar/Navbar";
import AdminPanelSettingsSharpIcon from '@mui/icons-material/AdminPanelSettingsSharp';
import AcercaDe from "../src/pages/AcercaDe";
import fondolibro5 from "../public/img/fondolibro5.jpg"
import { AuthPage, AuthStatus } from "./Auth";
import AgregarLibro from "./pages/Libros";

const hideNavList = [
    {
        path: "reportes",
        icon: <AdminPanelSettingsSharpIcon/>,
        tittle: "Reportes",
    },
    {
        path: "/proveedores",
        icon: <AdminPanelSettingsSharpIcon/>,
        tittle: "Proveedores",
    },
    {
        path: "/libros",
        icon: <AdminPanelSettingsSharpIcon/>,
        tittle: "Libros",
    },
    {
        path: "alquilar",
        icon: <AdminPanelSettingsSharpIcon/>,
        tittle: "Alquilar",
    },
    
]
const navLinkList = [
    {
        tittle: "home",
        path: "/home",
    },
    {
        tittle: "Empleados",
        path: "/empleados",
    },
    {
        tittle: "Acerca de ",
        path: "/acerca de",
    },
]

const backgroundStyle = {
    backgroundImage: `url(${fondolibro5})`, // URL de la imagen
    backgroundSize: "cover", // Escala la imagen para cubrir todo el contenedor
    backgroundPosition: "center", // Centra la imagen
    backgroundRepeat: "no-repeat", // Evita que se repita
    height: "100vh", // Asegura que cubra toda la pantalla
    width: "100%", // Ocupa todo el ancho
}
const Rutas = () => {
    return (
        <>
            <div style={backgroundStyle}>
                <NavBar navLinkList={navLinkList} hideNavList={hideNavList}/>
                <Container sx={{ mt: 5, }}>
                <AuthStatus/>
                    <Routes >
                        <Route path="/" element={<Layout />} >
                            <Route index element={<Inicio />} />
                                
                            <Route path="/empleados" element={<AuthPage><Empleados/></AuthPage>} />

                            <Route path="/home" element={<AuthPage><Home /></AuthPage>} />
                            <Route path="/libros" element={<AuthPage><AgregarLibro /></AuthPage>} />

                            <Route path="/acerca de" element={<AcercaDe />} />

                            <Route path="/*" element={<Default />} />

                        </Route>
                    </Routes>
                    
                </Container>
            </div>
        </>
    );
}

export default Rutas;