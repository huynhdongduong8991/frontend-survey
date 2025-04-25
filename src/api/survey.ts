import { privateApi } from "./base";

const subPath = "/surveys";

export const useSurveyApi = () => {
  const privateAPI = privateApi(subPath);

  const GET_SURVEYS = async () => {
    const response = await privateAPI.get("/surveys");
    return response.data;
  };

  const CREATE_SURVEY = async (surveyData) => {
    const response = await privateAPI.post("/surveys", surveyData);
    return response.data;
  };

  return { GET_SURVEYS, CREATE_SURVEY };
};
