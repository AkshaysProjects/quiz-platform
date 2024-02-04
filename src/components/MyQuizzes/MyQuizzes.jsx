import { React, useState } from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteQuiz,
  updateQuizStatus,
  updateQuiz,
} from "../../features/quiz/quizzesSlice";
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
} from "../../features/quiz/quizSlice";
import CreateQuizButton from "./CreateQuizButton";
import DeleteQuizModal from "./DeleteQuizModal";
import EditQuizModal from "./EditQuizModal";
import QuizTable from "./QuizTable";

const MyQuizzes = () => {
  // State hooks for managing modal visibility and selected quiz
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  // Redux hooks for accessing and dispatching state
  const quiz = useSelector((state) => state.quiz);
  const quizzes = useSelector((state) => state.quizzes);
  const dispatch = useDispatch();

  // React Router hook for navigation
  const navigate = useNavigate();

  // Handlers for opening and closing the edit modal
  const openEditModal = (quiz) => {
    setSelectedQuiz(quiz);
    dispatch(setQuiz(quiz));
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    dispatch(
      setQuiz({ title: "", description: "", questions: [], isActive: true })
    );
    setEditModalOpen(false);
  };

  // Handlers for opening and closing the delete modal
  const openDeleteModal = (quiz) => {
    setSelectedQuiz(quiz);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // Handler for editing a quiz
  const handleEditQuiz = (updatedQuiz) => {
    if (selectedQuiz) {
      dispatch(updateQuiz({ id: selectedQuiz.id, updatedQuiz }));
      closeEditModal();
    }
  };

  // Handler for deleting a quiz
  const handleDeleteQuiz = () => {
    if (selectedQuiz) {
      dispatch(deleteQuiz(selectedQuiz.id));
      closeDeleteModal();
    }
  };

  // Handler for toggling the active status of a quiz
  const toggleQuizStatus = (id) => {
    const quiz = quizzes.find((quiz) => quiz.id === id);
    if (quiz) {
      dispatch(updateQuizStatus({ quizId: id, isActive: !quiz.isActive }));
    }
  };

  // Handler for navigating to the quiz creation page
  const handleCreateNewQuiz = () => {
    navigate("/new");
  };

  // Render the MyQuizzes component
  return (
    <Container maxWidth="xl" sx={{ mt: 12 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">My Quizzes</Typography>
        <CreateQuizButton onClick={handleCreateNewQuiz} />
      </Box>

      <Paper
        elevation={3}
        sx={{
          padding: "8px",
          borderRadius: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <QuizTable
          quizzes={quizzes}
          openEditModal={openEditModal}
          openDeleteModal={openDeleteModal}
          toggleQuizStatus={toggleQuizStatus}
        />
      </Paper>

      {selectedQuiz && (
        <EditQuizModal
          open={editModalOpen}
          onClose={closeEditModal}
          quiz={quiz}
          onSave={handleEditQuiz}
          editTitle={(title) => dispatch(setQuiz({ ...quiz, title }))}
          editDescription={(description) =>
            dispatch(setQuiz({ ...quiz, description }))
          }
          addQuestion={(questionType) =>
            dispatch(addQuestion({ questionType }))
          }
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
      )}

      <DeleteQuizModal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        onDelete={handleDeleteQuiz}
      />
    </Container>
  );
};

export default MyQuizzes;
