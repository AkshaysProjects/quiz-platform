import React, { useState } from "react";
import { Modal, Box, Typography, Divider } from "@mui/material";
import modalStyle from "./modalStyle";
import QuestionList from "../EditQuiz/QuestionList";
import QuestionTypeDialog from "../EditQuiz/QuestionTypeDialog";
import QuizDetails from "../EditQuiz/QuizDetails";
import QuizButtons from "../EditQuiz/QuizButtons";

const EditQuizModal = ({
  open,
  onClose,
  quiz,
  onSave,
  editTitle,
  editDescription,
  addQuestion,
  editQuestion,
  deleteQuestion,
  toggleActive,
  addAnswer,
  editAnswer,
  deleteAnswer,
  toggleIsCorrect,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [titleTouched, setTitleTouched] = useState(false);
  const handleSave = () => {
    onSave(quiz);
    onClose();
  };

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const isTitleValid = quiz.title.length >= 10 && quiz.title.length < 30;
  const showTitleError = !isTitleValid && titleTouched;
  const isQuizValid = () => {
    if (!isTitleValid) return false;
    if (quiz.questions.length < 1) return false;
    for (let question of quiz.questions) {
      if (question.question.length < 5) return false;
      if (question.type === "MCQ" && question.answers.length < 2) return false;
      let hasCorrectAnswer = false;
      for (let answer of question.answers) {
        if (answer.option.length < 1) return false;
        if (answer.isCorrect) hasCorrectAnswer = true;
      }
      if (!hasCorrectAnswer) return false;
    }
    return true;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          ...modalStyle,
          width: "80%",
          maxWidth: "xl",
          maxHeight: "80vh",
          overflowY: "auto",
          alignContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }}>
          Edit Quiz
        </Typography>
        <QuizDetails
          title={quiz.title}
          description={quiz.description}
          editTitle={editTitle}
          editDescription={editDescription}
          setTitleTouched={setTitleTouched}
          showTitleError={showTitleError}
        />
        <QuestionList
          questions={quiz.questions}
          editQuestion={editQuestion}
          deleteQuestion={deleteQuestion}
          toggleActive={toggleActive}
          addAnswer={addAnswer}
          editAnswer={editAnswer}
          deleteAnswer={deleteAnswer}
          toggleIsCorrect={toggleIsCorrect}
        />
        <QuestionTypeDialog
          open={openDialog}
          onClose={handleCloseDialog}
          addQuestion={addQuestion}
        />
        <Divider sx={{ my: 1 }} />
        <QuizButtons
          handleOpenDialog={handleOpenDialog}
          isTitleValid={isTitleValid}
          isQuizValid={isQuizValid}
          handleSaveQuiz={handleSave}
        />
      </Box>
    </Modal>
  );
};

export default EditQuizModal;
