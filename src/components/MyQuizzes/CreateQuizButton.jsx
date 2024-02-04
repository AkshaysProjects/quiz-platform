import React from "react";
import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";

// A simple button component to create a new quiz
const CreateQuizButton = ({ onClick }) => (
  <Button
    variant="contained"
    color="primary"
    startIcon={<Add />}
    sx={{ fontSize: 16, borderRadius: 8 }}
    onClick={onClick}
  >
    Create New Quiz
  </Button>
);

export default CreateQuizButton;
