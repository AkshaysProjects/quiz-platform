import React, { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  Container,
  Button,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// Component for user login
const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState(""); // Track username input
  const [password, setPassword] = useState(""); // Track password input
  const navigate = useNavigate(); // Hook for navigation

  // Handle login action
  const handleLogin = () => {
    setIsLoggedIn(true); // Set logged in state to true
    navigate("/"); // Navigate to home page
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 12 }}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Typography variant="h4" mb={4}>
          Login
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 2, width: "300px" }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2, width: "300px" }}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{ width: "300px" }}
          >
            Login
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;
