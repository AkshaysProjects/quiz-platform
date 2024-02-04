import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const QuizStartScreen = ({
  quizTitle,
  quizDescription,
  userName,
  setUserName,
  handleStart,
}) => {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        {quizTitle}
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 2 }}>
        {quizDescription}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Enter your name to start the quiz
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
        }}
      >
        <TextField
          label="Your Name"
          variant="outlined"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          sx={{ mb: 2, width: "100%" }}
        />
        <Button
          variant="contained"
          onClick={handleStart}
          sx={{ alignSelf: "center" }}
        >
          Start Quiz
        </Button>
      </Box>
    </>
  );
};

export default QuizStartScreen;
