import { Box, Button, IconButton, ListItem, ListItemText } from "@mui/material";
import React, { SetStateAction, Dispatch, useState, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useReportApi } from "@/api/report";
import { useSurveyApi } from "@/api/survey";
import { AuthContext } from "@/context/auth-context";
import { KeyedMutator } from "swr";

interface FListItemProps<T> {
  data: T;
  onSelect: Dispatch<SetStateAction<number>>;
  isSelected: boolean;
  isUseDownloadReport: boolean;
  mutate: () => void;
  children: React.ReactNode;
}

export const FListItem = <T extends { id: number; title: string }>({
  data,
  onSelect,
  isSelected,
  isUseDownloadReport,
  mutate,
  children,
}: FListItemProps<T>) => {
  const { setLoading } = useContext(AuthContext);
  const { DELETE_SURVEY } = useSurveyApi();
  const { GENERATE_SURVEY_REPORT } = useReportApi();

  const handleDeleteSurvey = async () => {
    setLoading(true);
    try {
      await DELETE_SURVEY(String(data.id));
      mutate();
    } catch (error) {
      setLoading(false);
      console.error("Error during deleting survey", error);
    }
    setLoading(false);
  };

  const handleDownloadReport = async () => {
    setLoading(true);
    try {
      const res = await GENERATE_SURVEY_REPORT(String(data.id));
      const url = window.URL.createObjectURL(new Blob([res]));
      const link = document.createElement("a");
      link.href = url;
      const suffixFilename = Date.now();
      link.setAttribute("download", `survey_report_${suffixFilename}.docx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setLoading(false);
      console.error("Error during downloading report", error);
    }
    setLoading(false);
  };

  return (
    <>
      <ListItem
        key={data.id}
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
          boxShadow: 1,
          mb: 2,
          px: 3,
          py: 2,
          transition: "0.3s",
          "&:hover": {
            boxShadow: 4,
            backgroundColor: "grey.100",
          },
        }}
        secondaryAction={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              onClick={handleDeleteSurvey}
              sx={{
                bgcolor: "white",
                color: "black",
                border: "1px solid #0000005c",
                "&:hover": {
                  bgcolor: "#1976d2",
                  color: "white",
                  border: "none",
                },
              }}
              disabled={isSelected}
            >
              <DeleteIcon />
            </IconButton>
            {isUseDownloadReport && (
              <Button
                variant="contained"
                size="small"
                onClick={handleDownloadReport}
                sx={{
                  ml: 1,
                  textTransform: "none",
                  bgcolor: "white",
                  color: "black",
                  border: "1px solid #0000005c",
                  "&:hover": {
                    bgcolor: "#1976d2",
                    color: "white",
                    border: "none",
                  },
                  fontWeight: "bold",
                  borderRadius: 2,
                }}
                disabled={isSelected}
              >
                Download
              </Button>
            )}
          </Box>
        }
      >
        <ListItemText
          primary={data.title}
          onClick={() => onSelect(data.id)}
          slotProps={{
            primary: {
              sx: {
                fontWeight: "bold",
                fontSize: "1.1rem",
                cursor: "pointer",
                "&:hover": {
                  textDecoration: "underline",
                },
              },
            },
          }}
        />
      </ListItem>
      {!isSelected && <Box>{children}</Box>}
    </>
  );
};
