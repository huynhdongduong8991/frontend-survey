import { IUserLogin, IUserRegister, IUserResetPassword } from "@/interface/user.interface";
import { createContext, Dispatch, SetStateAction } from "react";

export interface IUser {
    id: number;
    userId: string;
    userGoogleId: string;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

export interface IAuthContext {
    user: IUser | null;
    setUser: Dispatch<SetStateAction<IUser | null>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
    googleLogin: () => Promise<void>;
    login: (payload: IUserLogin) => Promise<void>;
    register: (payload: IUserRegister) => Promise<void>;
    resetPassword: (payload: IUserResetPassword) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<IAuthContext>({
    user: null,
    setUser: () => {},
    loading: false,
    setLoading: () => {},
    googleLogin: async () => {},
    login: async () => {},
    register: async () => {},
    resetPassword: async () => {},
    logout: async () => {},
});
