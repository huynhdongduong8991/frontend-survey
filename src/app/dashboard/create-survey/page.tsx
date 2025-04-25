"use client";

import { useSurveyApi } from "@/api/survey";
import Loading from "@/components/Loading";
import { Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { surveyJSON } from "./create-survey-json";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import SurveyCreatorTheme from "survey-creator-core/themes";
import { registerCreatorTheme } from "survey-creator-core";

registerCreatorTheme(SurveyCreatorTheme);

const CreateSurvey = () => {
  const { CREATE_SURVEY } = useSurveyApi();
  const [creator, setCreator] = useState<SurveyCreator | null>(null);

  useEffect(() => {
    const surveyCreator = new SurveyCreator();
    surveyCreator.JSON = surveyJSON;

    setCreator(surveyCreator);
  }, []);

  const handleCreateSurvey = async () => {
    const schema = creator.JSON;
    console.log({ schema });
    try {
      // const data = await CREATE_SURVEY({ title, schema });
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
