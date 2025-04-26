import { privateApi } from "./base";

const subPath = "user";

export const useUserApi = () => {
  const privateAPI = privateApi(subPath);

  const GET_USER = async () => {
    const res = await privateAPI.get("");
    return res.data;
  };

  return { GET_USER };
};
