import { configureStore } from "@reduxjs/toolkit";
import quizzesReducer from "../../features/quiz/quizzesSlice";
import quizReducer from "../../features/quiz/quizSlice";
import answersReducer from "../../features/quiz/answersSlice";

export const store = configureStore({
  reducer: {
    quizzes: quizzesReducer,
    quiz: quizReducer,
    answers: answersReducer,
  },
});
