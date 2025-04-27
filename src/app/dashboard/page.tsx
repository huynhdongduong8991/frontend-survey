"use client";

import { FListItem } from "@/components/FListItem";
import Loading from "@/components/FLoading";
import { SubmissionForm } from "@/components/Submission";
import { AuthContext } from "@/context/auth-context";
import { useSurvey } from "@/data/survey";
import { ROUTES } from "@/utility/constants";

import {
  Box,
  Button,
  List,
  TextField,
  Typography
} from "@mui/material";
import { useRouter } from "next/navigation";
import { ChangeEvent, useContext, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState<number | null>(null);
  const { loading, setLoading, user } = useContext(AuthContext);
  const { data, mutate } = useSurvey(user?.email, query);

  const handleRedirectSurveyCreator = () => {
    setLoading(true);
    router.push(ROUTES.HOME + ROUTES.CREATE_SURVEY);
  };

  const handleQuerySurvey = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    mutate();
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Box sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom>
            Survey Dashboard
          </Typography>
          <Button variant="contained" onClick={handleRedirectSurveyCreator}>
            Create Survey
          </Button>
          <TextField
            label="Filter Surveys"
            value={query}
            onChange={handleQuerySurvey}
            fullWidth
            margin="normal"
          />
          {data.surveys.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              p={4}
              color="text.secondary"
            >
              <Typography variant="h5" gutterBottom>No Data Available</Typography>
            </Box>
          ) : (
            <List>
              {data.surveys.map((survey) => (
                <FListItem 
                  key={survey.id} 
                  data={survey}
                  isSelected={selectedSurvey !== null ? survey.id !== selectedSurvey : false}
                  onSelect={setSelectedSurvey}
                  isUseDownloadReport={true}
                  mutate={mutate}
                >
                  <SubmissionForm surveyId={selectedSurvey} />
                </FListItem>
              ))}
            </List>
          )}
        </Box>
      )}
    </>
  );
}
