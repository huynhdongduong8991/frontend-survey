"use client";

import { useSurveyApi } from "@/api/survey";
import Loading from "@/components/FLoading";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { surveySchemaJSON } from "./create-survey-schema";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import SurveyCreatorTheme from "survey-creator-core/themes";
import { registerCreatorTheme } from "survey-creator-core";
import { AuthContext } from "@/context/auth-context";

registerCreatorTheme(SurveyCreatorTheme);

const CreateSurvey = () => {
  const { setLoading } = useContext(AuthContext);
  const { CREATE_SURVEY } = useSurveyApi();
  const [creator, setCreator] = useState<SurveyCreator | null>(null);

  useEffect(() => {
    const surveyCreator = new SurveyCreator();
    surveyCreator.JSON = surveySchemaJSON;

    setCreator(surveyCreator);
    setLoading(false);
  }, []);

  const handleCreateSurvey = async () => {
    const schema = creator.JSON;

    try {
      const questions = JSON.stringify(schema?.pages);
      const payload: { title: string, questions: any } = {
        title: schema?.title,
        questions: questions,
      }
      console.log({ payload });
      const data = await CREATE_SURVEY(payload);
    } catch (error) {
      console.error("Error saving survey:", error);
    }
  };

  return (
    <>
      {!creator ? (
        <Loading />
      ) : (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            Create Survey
          </Typography>
          <div style={{ isolation: "isolate" }}>
            <SurveyCreatorComponent creator={creator} />
          </div>
          <Button
            variant="contained"
            onClick={handleCreateSurvey}
            sx={{ mt: 2 }}
          >
            Save Survey
          </Button>
        </Container>
      )}
    </>
  );
};

export default CreateSurvey;
