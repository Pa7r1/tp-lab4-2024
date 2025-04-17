export interface Usuario {
  username: string;
  rol: string;
  token: string;
}

export interface AuthContextType {
  usuario: Usuario | null;
  login: (userData: Usuario) => void;
  logout: () => void;
}
