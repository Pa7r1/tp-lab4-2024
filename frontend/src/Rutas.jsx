import {Routes, Route} from "react-router-dom"
import Layout from "../pages/Layout";
import Productos from "/pages/Productos";
import Default from "/pages/Default";
import Home from "../pages/Home";
import Inicio from "../pages/Inicio";

import { Container } from "@mui/material";
import Categorias from "../pages/Categorias";
import NavBar from "../componentes/navbar/Navbar";
import LogoutIcon from '@mui/icons-material/Logout';
import CategoryIcon from '@mui/icons-material/Category';

const hideNavList = [
    {
        path: "/categorias/terror",
        icon: <CategoryIcon/>,
        tittle: "terror",
    },
    {
        path: "/categorias/comedia",
        icon: <CategoryIcon/>,
        tittle: "comedia",
    },
    {
        path: "/categorias/romance",
        icon: <CategoryIcon/>,
        tittle: "romance",
    },
    {
        path: "/categorias/acción",
        icon: <CategoryIcon/>,
        tittle: "acccion",
    },
    {
        path: "/categorias/novelas",
        icon: <CategoryIcon/>,
        tittle: "novelas",
    },
]
const navLinkList = [
    {
        tittle: "home",
        path: "/home",
    },
    {
        tittle: "productos",
        path: "/productos",
    },
    {
        path : "/",
        icon: <LogoutIcon/>,
    },
]

const Rutas = () =>{
    return ( 
        <>
        <NavBar navLinkList= {navLinkList} hideNavList={hideNavList}/>
        <Container sx={{mt:5}}>
            
            <Routes >
                <Route path = "/" element={<Layout/>} >
                <Route index element={<Inicio/>} />
                <Route path = "/productos" element={<Productos/>} />
                <Route path = "/categorias" element={<Categorias/>} />
                <Route path = "/home" element={<Home/>} />
                <Route path = "/*" element={<Default/>} />
                </Route>
            </Routes>
            </Container>
        </>
    );
}

export default Rutas;