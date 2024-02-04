import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Paper, Typography } from "@mui/material";
import QuizStartScreen from "./QuizStartScreen";
import QuizQuestions from "./QuizQuestions";
import {
  initializeAnswers,
  saveAnswer,
  toggleAnswer,
} from "../../features/quiz/answersSlice";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quizzes);
  const userAnswers = useSelector((state) => state.answers);
  const [userName, setUserName] = useState("");
  const [isStarted, setIsStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const quiz = quizzes.find((quiz) => quiz.id.toString() === id);

  // Filter active questions at the time of component mounting to optimize performance
  const questions =
    quiz?.questions.filter((question) => question.isActive) || [];

  // Initialize answers in the redux store when the component mounts or the quiz changes
  useEffect(() => {
    if (quiz) {
      dispatch(initializeAnswers({ questions: quiz.questions }));
    }
  }, [quiz, dispatch]);

  // Handle the transition to the next question or navigate to the result page
  const handleButtonClick = () => {
    if (currentIndex === questions.length - 1) {
      navigate("/result", {
        state: { quiz, finished: true, questions, answers: userAnswers },
      });
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  // Start the quiz if a username is provided, else prompt for a name
  const handleStart = () => {
    if (userName.trim()) {
      setIsStarted(true);
    } else {
      alert("Please enter your name to start the quiz.");
    }
  };

  // Redirect to home page if the quiz is not active or not found
  useEffect(() => {
    if (!quiz || !quiz.isActive) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 5000);

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timer);
    }
  }, [quiz, navigate]);

  // Check if the quiz is active and display an error message if not
  if (!quiz || !quiz.isActive) {
    return (
      <Container maxWidth="xl" sx={{ mt: 12 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: "16px" }}>
          <Typography>
            This quiz is not active or could not be found. You will be
            redirected back to Home Page in 5 seconds.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 12 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: "16px" }}>
        {!isStarted ? (
          <QuizStartScreen
            quizTitle={quiz.title}
            quizDescription={quiz.description}
            userName={userName}
            setUserName={setUserName}
            handleStart={handleStart}
          />
        ) : (
          <QuizQuestions
            quizTitle={quiz.title}
            questions={questions}
            userAnswers={userAnswers}
            currentIndex={currentIndex}
            toggleAnswer={(questionIndex, answerIndex, isMultipleCorrect) =>
              dispatch(
                toggleAnswer({ questionIndex, answerIndex, isMultipleCorrect })
              )
            }
            saveAnswer={(questionIndex, answer) =>
              dispatch(saveAnswer({ questionIndex, answer }))
            }
            handleButtonClick={handleButtonClick}
          />
        )}
      </Paper>
    </Container>
  );
};

export default Quiz;
