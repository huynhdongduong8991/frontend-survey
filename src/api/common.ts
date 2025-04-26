import { privateApi, publicApi } from "./base";

const useCommonApi = () => {
  const publicAPI = publicApi();
  const privateAPI = privateApi();
  const FETCH_DATA = async (url: string) => {
    const res = await publicAPI.get(url);
    return res.data;
  };
  const FETCH_PRIVATE_DATA = async (url: string) => {
    const res = await privateAPI.get(url);
    return res.data;
  };
  return { FETCH_DATA, FETCH_PRIVATE_DATA };
};

export { useCommonApi };
