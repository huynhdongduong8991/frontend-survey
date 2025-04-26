"use client";

import { useAuthApi } from "@/api/auth";
import { AuthContext, IUser } from "@/context/auth-context";
import {
  IUserLogin,
  IUserRegister,
  IUserResetPassword,
} from "@/interface/user.interface";
import { ROUTES } from "@/utility/constants";
import {
  cleanTokenStorage,
  getTokenStorage,
  setTokenStorage,
} from "@/utility/storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./layouts/MainLayout/Header";
import { useUserApi } from "@/api/user";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState<IUser>(null);
  const [loading, setLoading] = useState(false);
  const { 
    GOOGLE_LOGIN, 
    LOGOUT, 
    LOGIN, 
    REGISTER, 
    RESET_PASSWORD
  } = useAuthApi();
  const { GET_USER } = useUserApi();

  useEffect(() => {
    const handleAuthentication = () => {
      const dataURL = new URLSearchParams(window.location.search);
      const token = dataURL.get("token");

      if (token) {
        setTokenStorage({ accessToken: token, refreshToken: "" });
        setLoading(true);
        router.push(ROUTES.HOME);
        return;
      }

      const tokenStorage = getTokenStorage();
      if (!tokenStorage.accessToken) {
        router.push(ROUTES.LOGIN);
      } else {
        setLoading(true);
        router.push(ROUTES.HOME);
      }
    };

    handleAuthentication();
  }, []);

  useEffect(() => {
    const accessToken = getTokenStorage();
    const fechUser = async () => {
      try {
        const user = await GET_USER();
        const userData = user.data as IUser;
        setUser(userData);
      } catch (error) {
        console.error("Error during fetching user", error);
      }
    };
    if (accessToken) {
      fechUser();
      setIsLogged(true);
    }
  }, [loading]);

  const googleLogin = async () => {
    try {
      await GOOGLE_LOGIN();
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const login = async (payload: IUserLogin) => {
    try {
      const data = await LOGIN(payload);

      if (data.success) {
        setTokenStorage({ accessToken: data.accessToken, refreshToken: "" });
        setLoading(true);
        setIsLogged(true);
        router.push(ROUTES.HOME);
      }
    } catch (error) {
      console.error("Error during login", error);
    }
  };

  const register = async (payload: IUserRegister) => {
    try {
      await REGISTER(payload);
      router.push(ROUTES.LOGIN);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const resetPassword = async (payload: IUserResetPassword) => {
    try {
      await RESET_PASSWORD(payload);
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };

  const logout = async () => {
    await LOGOUT();
    setIsLogged(false);
    setUser(null);
    cleanTokenStorage();
    router.push(ROUTES.LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        setLoading,
        googleLogin,
        logout,
        login,
        register,
        resetPassword,
      }}
    >
      {isLogged && <Header />}
      {children}
    </AuthContext.Provider>
  );
}
