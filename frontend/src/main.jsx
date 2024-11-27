import  { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import  {ThemeProvider}  from "@mui/material";
import Theme from "../public/Fuentes.jsx"
import Rutas from "./Rutas.jsx";
<<<<<<< HEAD
import { AuthProvider } from "./Auth.jsx";
=======
>>>>>>> dd46a16e2048b0ab60ba5cc75aebcb61cea07c9d



createRoot
(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
<<<<<<< HEAD
      <AuthProvider>
        <CssBaseline />
        <Rutas/>
        </AuthProvider>
=======
        <CssBaseline />
        <Rutas/>
>>>>>>> dd46a16e2048b0ab60ba5cc75aebcb61cea07c9d
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
