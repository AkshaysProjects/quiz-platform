import React from "react";
import { Button, Box } from "@mui/material";
import { AddCircleOutline, Save } from "@mui/icons-material";

const QuizButtons = ({
  handleOpenDialog,
  isTitleValid,
  isQuizValid,
  handleSaveQuiz,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        mt: 2,
        position: "relative",
        padding: "16px",
      }}
    >
      <Button
        variant="outlined"
        startIcon={<AddCircleOutline />}
        disabled={!isTitleValid}
        onClick={handleOpenDialog}
        sx={{ borderRadius: "4px", mb: 2 }}
      >
        Add Question
      </Button>
      <Button
        variant="contained"
        startIcon={<Save />}
        disabled={!isQuizValid()}
        onClick={handleSaveQuiz}
        sx={{
          borderRadius: "4px",
        }}
      >
        Save Quiz
      </Button>
    </Box>
  );
};

export default QuizButtons;
