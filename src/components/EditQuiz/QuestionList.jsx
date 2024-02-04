import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { AddCircleOutline, Close, CheckCircle } from "@mui/icons-material";
import CustomSwitch from "./CustomSwitch";

const QuestionList = ({
  questions,
  editQuestion,
  deleteQuestion,
  toggleActive,
  addAnswer,
  editAnswer,
  deleteAnswer,
  toggleIsCorrect,
}) => {
  const [errorIndexes, setErrorIndexes] = useState({});

  // Validates question length and updates error state
  const validateQuestionLength = (index, question) => {
    const isValid = question.length >= 10 && question.length <= 200;
    setErrorIndexes((prev) => ({ ...prev, [index]: !isValid }));
  };

  return (
    <Box sx={{ width: "100%", margin: "auto" }}>
      {questions.map((question, index) => (
        <Box key={index} sx={{ marginBottom: 4 }}>
          <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Question {index + 1}
              </Typography>
              {/* Custom switch to toggle active/inactive state of a question */}
              <CustomSwitch
                checked={question.isActive}
                onChange={() => toggleActive(index)}
              />
            </Box>
            <TextField
              label="What is the question?"
              variant="outlined"
              fullWidth
              value={question.question}
              onChange={(e) => editQuestion(index, e.target.value)}
              onBlur={(e) => validateQuestionLength(index, e.target.value)}
              error={errorIndexes[index]}
              helperText={
                errorIndexes[index]
                  ? "Question must be 10-200 characters long."
                  : ""
              }
              sx={{ marginBottom: 2 }}
              inputProps={{ maxLength: 200 }}
            />
            {/* Answer fields with validation and controls for MCQ type questions */}
            {question.answers.map((answer, answerIndex) => (
              <Box
                key={`answer-${answerIndex}`}
                sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
              >
                <TextField
                  label="Answer"
                  variant="outlined"
                  fullWidth
                  sx={{ flexGrow: 1, marginRight: 1 }}
                  value={answer.option}
                  onChange={(e) =>
                    editAnswer(index, answerIndex, e.target.value)
                  }
                  inputProps={{
                    maxLength: question.type === "Short" ? 50 : undefined,
                    minLength: question.type === "Descriptive" ? 50 : undefined,
                  }}
                />
                {question.type === "MCQ" && (
                  <>
                    <IconButton
                      color={answer.isCorrect ? "primary" : "default"}
                      onClick={() =>
                        toggleIsCorrect(index, answerIndex, !answer.isCorrect)
                      }
                    >
                      <CheckCircle />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteAnswer(index, answerIndex)}
                    >
                      <Close />
                    </IconButton>
                  </>
                )}
              </Box>
            ))}
            {question.type === "MCQ" && (
              <Button
                variant="outlined"
                startIcon={<AddCircleOutline />}
                onClick={() => addAnswer(index)}
              >
                Add Answer
              </Button>
            )}
          </Paper>
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteQuestion(index)}
          >
            Delete Question
          </Button>
        </Box>
      ))}
    </Box>
  );
};

export default QuestionList;
