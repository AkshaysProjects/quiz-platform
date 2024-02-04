import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Typography, Card, CardContent, Container, Box } from "@mui/material";
import calculateScore from "../utils/calculateScore"; // Assume calculateScore is an external utility function
import congratulationsImage from "../assets/congratulations.png"; // Import the image

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    // Redirect if the state is not properly set
    if (!state || !state.quiz || !state.finished) {
      navigate("/");
    }
  }, [navigate, state]);

  // If state is not set, return null to render nothing
  if (!state || !state.quiz || !state.finished) {
    return null;
  }

  // Calculate the score using a utility function
  const score = calculateScore(state.quiz.questions, state.answers);
  const totalQuestions = state.quiz.questions.length;

  return (
    <Container maxWidth="xl" sx={{ mt: 4 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        align="center"
        minHeight="50vh"
      >
        <Card elevation={3} sx={{ p: 3, borderRadius: 2 }}>
          <CardContent>
            <img
              src={congratulationsImage}
              alt="Congratulations"
              style={{ maxWidth: "500px", height: "auto" }}
            />
            <Typography variant="h5" sx={{ mt: 5 }}>
              You've scored {score} out of {totalQuestions}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Result;
