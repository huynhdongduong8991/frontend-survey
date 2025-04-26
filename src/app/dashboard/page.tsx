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
import { useContext, useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [filter, setFilter] = useState("");
  const [selectedSurvey, setSelectedSurvey] = useState<number | null>(null);
  const { setLoading, user } = useContext(AuthContext);
  const { data: surveysData } = useSurvey(user?.email);

  const handleRedirectSurveyCreator = () => {
    setLoading(true);
    router.push(ROUTES.HOME + ROUTES.CREATE_SURVEY);
  };

  return (
    <>
      {surveysData.length === 0 ? (
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
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            fullWidth
            margin="normal"
          />
          <List>
            {surveysData.map((survey) => (
              <FListItem key={survey.id} data={survey} onSelect={setSelectedSurvey}  />
            ))}
          </List>
          {selectedSurvey && <SubmissionForm surveyId={selectedSurvey} />}
        </Box>
      )}
    </>
  );
}
