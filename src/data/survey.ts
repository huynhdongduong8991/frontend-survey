import useSWR from "swr";
import { useCommonApi } from "@/api/common";
import { ISurveyResponse } from "@/interface/survey.interface";

export const useSurvey = (email: string, query: string) => {
  const { FETCH_DATA } = useCommonApi();
  email = email ? email : "";
  const key = `surveys?email=${email}&title=${query}`;
  const { data, mutate, error } = useSWR<ISurveyResponse>(key, FETCH_DATA);
  const loading = !data && !error;
  
  return {
    loading,
    data: data?.data || { surveys: [], totalItem: 0 },
    mutate,
  };
};
