import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Container, Paper, Typography } from "@mui/material";
import QuestionTypeDialog from "./EditQuiz/QuestionTypeDialog";
import QuestionList from "./EditQuiz/QuestionList";
import {
  setQuiz,
  addQuestion,
  deleteQuestion,
  editQuestion,
  toggleActive,
  addAnswer,
  editAnswer,
  deleteAnswer,
  toggleIsCorrect,
} from "../features/quiz/quizSlice";
import { addQuiz } from "../features/quiz/quizzesSlice";
import QuizButtons from "./EditQuiz/QuizButtons";
import QuizDetails from "./EditQuiz/QuizDetails";

// Define the NewQuiz component
const NewQuiz = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [titleTouched, setTitleTouched] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const quiz = useSelector((state) => state.quiz);

  // Handler functions
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  // Save quiz and navigate
  const handleSaveQuiz = () => {
    dispatch(addQuiz(quiz));
    navigate("/quizzes");
  };

  // Validate quiz title and entire quiz
  const isTitleValid = quiz.title.length >= 10 && quiz.title.length <= 30;
  const showTitleError = !isTitleValid && titleTouched;
  const isQuizValid = () => {
    if (!isTitleValid || quiz.questions.length < 1) return false;
    return quiz.questions.every((question) => {
      const hasCorrectAnswer = question.answers.some(
        (answer) => answer.isCorrect
      );
      return (
        question.question.length >= 5 &&
        (question.type !== "MCQ" ||
          (question.answers.length >= 2 && hasCorrectAnswer))
      );
    });
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Create New Quiz
      </Typography>
      <Paper
        elevation={3}
        sx={{
          padding: "32px",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <QuizDetails
          title={quiz.title}
          description={quiz.description}
          editTitle={(title) => dispatch(setQuiz({ ...quiz, title }))}
          editDescription={(description) =>
            dispatch(setQuiz({ ...quiz, description }))
          }
          setTitleTouched={setTitleTouched}
          showTitleError={showTitleError}
        />
        <QuestionTypeDialog
          open={openDialog}
          onClose={handleCloseDialog}
          addQuestion={(questionType) =>
            dispatch(addQuestion({ questionType }))
          }
        />
        <QuestionList
          questions={quiz.questions}
          editQuestion={(questionIndex, value) =>
            dispatch(editQuestion({ questionIndex, value }))
          }
          deleteQuestion={(questionIndex) =>
            dispatch(deleteQuestion({ questionIndex }))
          }
          toggleActive={(questionIndex) =>
            dispatch(toggleActive({ questionIndex }))
          }
          addAnswer={(questionIndex) => dispatch(addAnswer({ questionIndex }))}
          editAnswer={(questionIndex, answerIndex, value) =>
            dispatch(editAnswer({ questionIndex, answerIndex, value }))
          }
          deleteAnswer={(questionIndex, answerIndex) =>
            dispatch(deleteAnswer({ questionIndex, answerIndex }))
          }
          toggleIsCorrect={(questionIndex, answerIndex) =>
            dispatch(toggleIsCorrect({ questionIndex, answerIndex }))
          }
        />
        <QuizButtons
          handleOpenDialog={handleOpenDialog}
          isTitleValid={isTitleValid}
          isQuizValid={isQuizValid}
          handleSaveQuiz={handleSaveQuiz}
        />
      </Paper>
    </Container>
  );
};

export default NewQuiz;
