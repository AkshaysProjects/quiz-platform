import React from "react";
import { Box, Card, CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import newQuizImg from "../assets/newquiz.png";
import myQuizzesImg from "../assets/myquizzes.png";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        gap: "10vh",
        p: 2,
        pt: "1vh",
        minHeight: "100vh",
      }}
    >
      <Card sx={{ width: { xs: "90%", md: "45%" }, overflow: "visible" }}>
        <CardActionArea component={Link} to="/new">
          <CardMedia
            component="img"
            image={newQuizImg}
            alt="New Quiz"
            sx={{ width: "100%", objectFit: "cover" }}
          />
        </CardActionArea>
      </Card>

      <Card sx={{ width: { xs: "90%", md: "45%" }, overflow: "visible" }}>
        <CardActionArea component={Link} to="/quizzes">
          <CardMedia
            component="img"
            image={myQuizzesImg}
            alt="My Quizzes"
            sx={{ width: "100%", objectFit: "cover" }}
          />
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default Home;
