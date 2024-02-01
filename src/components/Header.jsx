import { AppBar, Toolbar, Button, Box } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const Header = () => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Link to="/" style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" style={{ height: "60px" }} />
        </Link>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          color="inherit"
          component={Link}
          to="/"
          sx={{
            color: "inherit",
            "&:hover": { color: "blue" },
            marginRight: "20px",
            textTransform: "none",
            fontSize: "1.1rem",
          }}
        >
          Home
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/quizzes"
          sx={{
            color: "inherit",
            "&:hover": { color: "blue" },
            marginRight: "20px",
            textTransform: "none",
            fontSize: "1.1rem",
          }}
        >
          My Quizzes
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
