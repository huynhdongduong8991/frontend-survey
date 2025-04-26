import {
  IUserLogin,
  IUserRegister,
  IUserResetPassword,
} from "@/interface/user.interface";
import { privateApi, publicApi, googleApi } from "./base";

const subPath = "auth";

export const useAuthApi = () => {
  const privateAPI = privateApi(subPath);
  const publicAPI = publicApi(subPath);

  const GOOGLE_LOGIN = async () => {
    await googleApi("auth/google/login");
  };

  const LOGIN = async (payload: IUserLogin) => {
    const res = await publicAPI.post("/login", payload);
    return res.data;
  };

  const REGISTER = async (payload: IUserRegister) => {
    await publicAPI.post("/register", payload);
  };

  const RESET_PASSWORD = async (payload: IUserResetPassword) => {
    await publicAPI.post("/reset-password", payload);
  };

  const LOGOUT = async () => {
    await privateAPI.post("/logout");
  };

  return { GOOGLE_LOGIN, LOGIN, REGISTER, LOGOUT, RESET_PASSWORD };
};
