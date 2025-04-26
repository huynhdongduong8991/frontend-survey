import useSWR from "swr";
import { useCommonApi } from "@/api/common";
import { ISurveyResponse } from "@/interface/survey.interface";

export const useSurvey = (email: string) => {
  const { FETCH_DATA } = useCommonApi();
  email = email ? email : "";
  const key = `surveys?email=${email}`;
  const { data, mutate, error } = useSWR<ISurveyResponse>(key, FETCH_DATA);
  const loading = !data && !error;

  return {
    loading,
    data: data?.data || [],
    mutate,
  };
};
