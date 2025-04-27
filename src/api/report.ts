import { privateApi } from "./base";

const subPath = "report";

export const useReportApi = () => {
  const privateAPI = privateApi(subPath);

  const GENERATE_SURVEY_REPORT = async (surveyId: string) => {
    const res = await privateAPI.get(`/${surveyId}`, { responseType: 'blob' });
    return res.data;
  }
  
  return { GENERATE_SURVEY_REPORT };
};
