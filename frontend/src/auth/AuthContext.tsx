import { createContext, useEffect, useState } from "react";
import { Usuario } from "../models/user";
import { LoginApi } from "../service/AuthService";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserContextType = {
  usuario: Usuario | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUsuario(JSON.parse(user));
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await LoginApi(username, password);
    if (response && response.data) {
      const userData = response.data;
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData));
      setUsuario(userData);
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + userData.token;
      navigate("/dashboard");
    }
  };

  const isLoggedIn = () => {
    return !!usuario;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUsuario(null);
    navigate("/");
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout, isLoggedIn }}>
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
