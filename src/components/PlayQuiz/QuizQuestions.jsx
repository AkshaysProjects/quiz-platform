import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
} from "@mui/material";

const QuizQuestions = ({
  quizTitle,
  questions,
  userAnswers,
  currentIndex,
  toggleAnswer,
  saveAnswer,
  handleButtonClick,
}) => {
  // Helper function to render MCQ options
  const renderMCQOptions = (answers, isMultipleCorrect) => {
    return answers.map((answer, index) => {
      return (
        <FormControlLabel
          key={index}
          control={isMultipleCorrect ? <Checkbox /> : <Radio />}
          label={answer.option}
          value={answer.option}
          checked={userAnswers[currentIndex].answers[index].isSelected}
          onChange={(e) => toggleAnswer(currentIndex, index, isMultipleCorrect)}
        />
      );
    });
  };

  // Determine if the question is MCQ and how many correct answers there are
  const currentQuestion = questions[currentIndex];
  const isMCQ = currentQuestion.type === "MCQ";
  const correctAnswersCount = currentQuestion.answers.filter(
    (answer) => answer.isCorrect
  ).length;
  const isMultipleCorrect = correctAnswersCount >= 2;

  // Determine if the "Next" or "Submit" button should be disabled
  const isButtonDisabled = () => {
    if (isMCQ) {
      const selectedAnswersCount = userAnswers[currentIndex].answers.filter(
        (answer) => answer.isSelected
      ).length;
      if (isMultipleCorrect) {
        return selectedAnswersCount < 2;
      } else {
        return selectedAnswersCount === 0;
      }
    } else if (currentQuestion.type === "Short") {
      return userAnswers[currentIndex].answers[0].option.length < 1;
    } else if (currentQuestion.type === "Descriptive") {
      return userAnswers[currentIndex].answers[0].option.length < 50;
    }
    return false;
  };

  return (
    <>
      <Typography variant="h4" align="center">
        {quizTitle}
      </Typography>

      <Typography variant="h6">
        {currentIndex + 1}. {currentQuestion.question}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          mt: 2,
        }}
      >
        {isMCQ && (
          <FormControl component="fieldset">
            <RadioGroup name="quiz-options" defaultValue="">
              {renderMCQOptions(currentQuestion.answers, isMultipleCorrect)}
            </RadioGroup>
          </FormControl>
        )}
        {currentQuestion.type === "Short" && (
          <TextField
            label="Your Answer"
            variant="outlined"
            inputProps={{ maxLength: 50 }}
            value={userAnswers[currentIndex].answers[0].option}
            onChange={(e) => saveAnswer(currentIndex, e.target.value)}
          />
        )}
        {currentQuestion.type === "Descriptive" && (
          <TextField
            label="Your Answer"
            variant="outlined"
            multiline
            rows={4}
            value={userAnswers[currentIndex].answers[0].option}
            onChange={(e) => saveAnswer(currentIndex, e.target.value)}
          />
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="contained"
            onClick={handleButtonClick}
            disabled={isButtonDisabled()}
          >
            {currentIndex === questions.length - 1 ? "Submit" : "Next Question"}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default QuizQuestions;
