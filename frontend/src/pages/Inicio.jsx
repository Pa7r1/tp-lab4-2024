import * as React from "react";
import { useState } from "react";
import PasswordIcon from "@mui/icons-material/Password";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useAuth } from "../Auth";
import { useLocation, useNavigate } from "react-router-dom";


export default function Inicio() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const onSubmit = (event) => {
    const formData = new FormData(event.currentTarget);
    const usuario = formData.get("usuario");
    const password = formData.get("password");

    login(
      usuario,
      password,
      () => navigate(from, { replace: true }), // OK
      () => setError(true) // Error
    );

    event.preventDefault();
  };

  return (
    <>
      <form
        style={{ borderStyle: "inset", textAlign: "center", backgroundColor: "#d8cdc4", height: 450, width:1150 }}
        onSubmit={onSubmit} >
          <h1>Iniciar de sesión</h1>
        <div style={{ fontSize: 40,margin:30 }}>
          <label htmlFor="usuario">
            <AccountCircle />
          </label>
          <input
            style={{ flex: 1, padding: "0.8rem", fontSize: "1.2rem", border: "1px solid #ccc", borderRadius: 5 }}
            name="usuario" placeholder="Usuario" type="text" />
        </div>
        <br />
        <div style={{ fontSize: 40 }}>
          <label htmlFor="password"><PasswordIcon /></label>
          <input
            style={{ flex: 1, padding: "0.8rem", fontSize: "1.2rem", border: "1px solid #ccc", borderRadius: 5 }}
            name="password" placeholder="Contraseña" type="password" />
        </div>
        <br />
        <div>
          <button style={{backgroundColor: "#b6293a", color:"#ffff", width:250, height:50,margin:40, borderRadius:8}} type="submit">Ingresar</button>
        </div >
        {error && <h1>Usuario o contraseña inválido</h1>}
      </form>
      

    </>
  );
}