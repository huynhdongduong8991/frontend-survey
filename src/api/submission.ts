import { privateApi } from "./base";

const subPath = "submissions";

export const useSubmissionApi = () => {
  const privateAPI = privateApi(subPath);

  const CREATE_SUBMISSION = async (payload: { surveyId: number, answers: string }) => {
    const res = await privateAPI.post("", payload);
    return res.data;
  }

  return { CREATE_SUBMISSION };
};
