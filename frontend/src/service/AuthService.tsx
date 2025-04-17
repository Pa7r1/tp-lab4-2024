import axios from "axios";
import { Usuario } from "../models/user.ts";

const api = "http://localhost:3000/api/v1/login";

export const LoginApi = async (username: string, password: string) => {
  try {
    const data = await axios.post<Usuario>(api, {
      username: username,
      password: password,
    });
    return data;
  } catch (error) {
    console.log("error en loginApi: ", error);
  }
};
