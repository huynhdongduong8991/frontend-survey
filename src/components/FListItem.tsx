import { Box, Button, IconButton, ListItem, ListItemText } from "@mui/material";
import React, { SetStateAction, Dispatch } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface FListItemProps<T> {
  data: T;
  onSelect: Dispatch<SetStateAction<number>>;
}

export const FListItem = <T extends { id: number; title: string }>({
  data,
  onSelect,
}: FListItemProps<T>) => {
  return (
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
            onClick={() => {}}
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
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={() => onSelect(data.id)}
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
          >
            <EditIcon />
          </IconButton>
          <Button
            variant="contained"
            size="small"
            href={`/reports/${data.id}`}
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
          >
            Download
          </Button>
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
  );
};
