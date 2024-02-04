import { createSlice } from "@reduxjs/toolkit";
import initialQuizzes from "../../data/dummydata.json";
import { formatDate } from "../../utils/dateUtils";

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState: initialQuizzes,

  reducers: {
    // Adds a new quiz to the list
    addQuiz: (state, { payload }) => [
      ...state,
      {
        id: Date.now(),
        title: payload.title,
        description: payload.description,
        questions: payload.questions,
        isActive: true,
        createdOn: formatDate(new Date()),
      },
    ],

    // Deletes a quiz by its ID
    deleteQuiz: (state, { payload: quizId }) =>
      state.filter((quiz) => quiz.id !== quizId),

    // Updates the activation status of a quiz
    updateQuizStatus: (state, { payload: { quizId, isActive } }) => {
      const quiz = state.find((quiz) => quiz.id === quizId);
      if (quiz) {
        quiz.isActive = isActive;
      }
    },

    // Updates quiz details
    updateQuiz: (state, { payload: { id, updatedQuiz } }) => {
      const index = state.findIndex((quiz) => quiz.id === id);
      if (index !== -1) {
        state[index] = {
          ...state[index],
          ...updatedQuiz,
        };
      }
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuizStatus, updateQuiz } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
