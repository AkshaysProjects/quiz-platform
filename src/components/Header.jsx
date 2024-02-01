import { AppBar, Toolbar } from "@mui/material";
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
