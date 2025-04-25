import axios, { AxiosResponse } from "axios";
import { cleanTokenStorage, getTokenStorage } from "@/utility/storage";
import { ROUTES } from "@/utility/constants";

export type APIResponse<T = any> = {
  items?: T[];
  data?: T;
  error?: {
    code: string;
    message: string;
  };
  success?: boolean;
};
export const publicApi = (subPath: string = "") => {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE}/${subPath}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  api.interceptors.response.use(
    (response: AxiosResponse<APIResponse>) => {
      return checkErrorCode(response);
    },
    (error) => {
      return checkErrorCode(error.response);
    },
  );

  return api;
};

export const privateApi = (subPath: string = "") => {
  const api = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_API_BASE}/${subPath}`,
    headers: { "Content-Type": "application/json" },
  });

  api.interceptors.request.use(
    async (config) => {
      const token = getTokenStorage();
      if (config.headers) {
        config.headers.authorization = `Bearer ${token.accessToken}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    async (response: AxiosResponse<APIResponse, any>) => {
      return checkErrorCode(response);
    },
    async (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          cleanTokenStorage();
          window.location.href = ROUTES.LOGIN;
        }
      }
      return checkErrorCode(error.response);
    },
  );

  return api;
};

export const googleApi = async (subPath = "") => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_BASE}/${subPath}`;
}

async function checkErrorCode(response: AxiosResponse<APIResponse>) {
  try {
    switch (response.data.success) {
      case false:
        break;
      case true:
        break;
      default:
        break;
    }
    return response;
  } catch (error) {
    response = { ...response, data: { success: false } };
    return response;
  }
}
