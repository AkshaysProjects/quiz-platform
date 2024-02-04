import React from "react";
import { TextField } from "@mui/material";

const QuizDetails = ({
  title,
  description,
  editTitle,
  setTitleTouched,
  editDescription,
  showTitleError,
}) => {
  return (
    <>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        required
        inputProps={{ minLength: 10, maxLength: 30 }}
        error={showTitleError}
        helperText={
          showTitleError ? "Title must be 10-30 characters long." : ""
        }
        onBlur={() => setTitleTouched(true)}
        onChange={(e) => editTitle(e.target.value)}
        value={title}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        onChange={(e) => editDescription(e.target.value)}
        value={description}
        sx={{ mb: 2 }}
      />
    </>
  );
};

export default QuizDetails;
