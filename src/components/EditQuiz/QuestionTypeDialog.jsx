import React from "react";
import {
  Dialog,
  DialogTitle,
  IconButton,
  Button,
  DialogContent,
  Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";

const QuestionTypeDialog = ({ open, onClose, addQuestion }) => {
  // Handles the selection of a question type and closes the dialog
  const handleQuestionTypeSelect = (questionType) => {
    addQuestion(questionType);
    onClose();
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      fullWidth
      maxWidth="sm"
      sx={{ "& .MuiDialog-paper": { borderRadius: 6 } }}
    >
      <DialogTitle sx={{ textAlign: "center", fontWeight: "bold" }}>
        Select Question Type
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            gap: 2,
          }}
        >
          {/* Buttons for selecting the question type */}
          {["MCQ", "Short Answer", "Descriptive"].map((type) => (
            <Button
              key={type}
              variant="outlined"
              onClick={() => handleQuestionTypeSelect(type)}
              sx={{
                borderRadius: 16,
                width: 1,
                "&:hover": { backgroundColor: "#1976d2", color: "#fff" },
              }}
            >
              {type}
            </Button>
          ))}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default QuestionTypeDialog;
