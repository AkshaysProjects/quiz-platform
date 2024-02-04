import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import modalStyle from "./modalStyle"; // Ensure modalStyle is appropriately defined for layout

const DeleteQuizModal = ({ open, onClose, onDelete }) => (
  <Modal open={open} onClose={onClose}>
    <Box sx={modalStyle}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Are you sure you want to delete this quiz?
      </Typography>
      {/* 'Yes' Button for confirming deletion */}
      <Button
        variant="contained"
        color="error"
        onClick={onDelete}
        sx={{ borderRadius: 2, mr: 2 }}
      >
        Yes
      </Button>
      {/* 'No' Button to cancel deletion */}
      <Button
        variant="text"
        onClick={onClose}
        sx={{
          borderRadius: 2,
          "&:hover": { bgcolor: "primary.main", color: "common.white" },
        }}
      >
        No
      </Button>
    </Box>
  </Modal>
);

export default DeleteQuizModal;
