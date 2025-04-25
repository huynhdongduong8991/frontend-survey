"use client";

import { useAuthApi } from "@/api/auth";
import { AuthContext, IUser } from "@/context/auth-context";
import {
  IUserLogin,
  IUserRegister,
  IUserResetPassword,
} from "@/interface/user";
import { ROUTES } from "@/utility/constants";
import {
  cleanTokenStorage,
  getTokenStorage,
  setTokenStorage,
} from "@/utility/storage";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Header from "./layouts/MainLayout/Header";

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

  useEffect(() => {
    const handleAuthentication = () => {
      const dataURL = new URLSearchParams(window.location.search);
      const token = dataURL.get("token");

      if (token) {
        setTokenStorage({ accessToken: token, refreshToken: "" });
        setLoading(true);
        router.push(ROUTES.CREATE_SURVEY);
        return;
      }

      const tokenStorage = getTokenStorage();
      if (!tokenStorage.accessToken) {
        router.push(ROUTES.LOGIN);
      } else {
        setLoading(true);
        router.push(ROUTES.CREATE_SURVEY);
      }
    };

    handleAuthentication();
  }, []);

  useEffect(() => {
    const accessToken = getTokenStorage();
    if (accessToken) {
      setIsLogged(true);
    }
  }, [loading]);

  const googleLogin = async () => {
    await GOOGLE_LOGIN();
  };

  const login = async (payload: IUserLogin) => {
    const data = await LOGIN(payload);
    setTokenStorage({ accessToken: data.accessToken, refreshToken: "" });
    setLoading(true);
    setIsLogged(true);
    router.push(ROUTES.CREATE_SURVEY);
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
    setUser(null);
    cleanTokenStorage();
    setIsLogged(false);
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
