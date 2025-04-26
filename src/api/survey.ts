import { privateApi } from "./base";

const subPath = "surveys";

export const useSurveyApi = () => {
  const privateAPI = privateApi(subPath);

  const GET_SURVEYS = async () => {
    const response = await privateAPI.get("");
    return response.data;
  };

  const GET_SURVEY = async (surveyId: number) => {
    const response = await privateAPI.get(`/${surveyId}`);
    return response.data;
  }

  const CREATE_SURVEY = async (payload: { title: string, questions: any }) => {
    const response = await privateAPI.post("", payload);
    return response.data;
  };

  return { GET_SURVEYS, CREATE_SURVEY, GET_SURVEY };
};
