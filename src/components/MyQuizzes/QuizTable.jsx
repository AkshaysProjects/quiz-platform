import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import { Edit, Delete, PlayArrow } from "@mui/icons-material";
import CustomSwitch from "../EditQuiz/CustomSwitch";
import { useNavigate } from "react-router-dom";

const QuizTable = ({
  quizzes,
  openEditModal,
  openDeleteModal,
  toggleQuizStatus,
}) => {
  const navigate = useNavigate();

  // Navigate to the quiz play page.
  const handlePlayQuiz = (id) => navigate(`/quiz/${id}`);

  return (
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell align="center">Quiz No</TableCell>
          <TableCell>Title</TableCell>
          <TableCell align="center">Status</TableCell>
          <TableCell align="center">Created On</TableCell>
          <TableCell align="center">Actions</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {quizzes.map((quiz, index) => (
          <TableRow key={quiz.id}>
            <TableCell align="center" component="th" scope="row">
              {index + 1}
            </TableCell>
            <TableCell>{quiz.title}</TableCell>
            <TableCell align="center">
              <CustomSwitch
                checked={quiz.isActive}
                onChange={() => toggleQuizStatus(quiz.id)}
              />
            </TableCell>
            <TableCell align="center">{quiz.createdOn}</TableCell>
            <TableCell align="center">
              <IconButton onClick={() => openEditModal(quiz)} color="primary">
                <Edit />
              </IconButton>
              <IconButton
                onClick={() => openDeleteModal(quiz)}
                color="secondary"
              >
                <Delete />
              </IconButton>
            </TableCell>
            <TableCell align="center">
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePlayQuiz(quiz.id)}
              >
                <PlayArrow /> Play
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default QuizTable;
