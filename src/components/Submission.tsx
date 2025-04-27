import { useSubmissionApi } from "@/api/submission";
import { useSurveyApi } from "@/api/survey";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";

interface SubmissionProps {
  surveyId: number;
}

export const SubmissionForm = ({ surveyId }: SubmissionProps) => {
  const { GET_SURVEY } = useSurveyApi();
  const { CREATE_SUBMISSION } = useSubmissionApi();
  const [surveyModel, setSurveyModel] = useState<Model | null>(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      if (surveyId) {
        const res = await GET_SURVEY(surveyId);

        if (res.data) {
          const questions = res.data.questions;
          const surveyJson = {
            pages: Array.from(questions).map((item: any) => ({
              name: item.name,
              elements: item.elements,
            })),
          };

          const survey = new Model(surveyJson);
          survey.onComplete.add(onComplete);
          setSurveyModel(survey);
        }
      }
    };
    fetchSurvey();
  }, [surveyId]);

  const onComplete = async (survey: Model) => {
    try {
      const answers = JSON.stringify(survey.data);
      await CREATE_SUBMISSION({ surveyId, answers });
    } catch (error) {
      console.error("Error during submission", error);
    }
  };

  return <Box>{!surveyModel ? null : <Survey model={surveyModel} />}</Box>;
};
