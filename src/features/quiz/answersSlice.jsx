import { createSlice } from "@reduxjs/toolkit";

const answersSlice = createSlice({
  name: "answers",
  initialState: [], // Start with an empty array of answers.
  reducers: {
    // Initialize answers based on the provided questions.
    initializeAnswers: (state, action) => {
      return action.payload.questions.map((question) => ({
        question: question.question,
        answers: question.answers.map((answer) => ({
          option: question.type !== "MCQ" ? "" : answer.option, // Set option text; empty for non-MCQ.
          isSelected: question.type !== "MCQ",
        })),
      }));
    },

    // Toggle the selection state of an answer.
    toggleAnswer: (state, action) => {
      const { questionIndex, answerIndex, isMultipleCorrect } = action.payload;
      if (!isMultipleCorrect) {
        // For single-correct answers, ensure only one answer is selected at a time.
        state[questionIndex].answers.forEach((answer, index) => {
          answer.isSelected =
            index === answerIndex ? !answer.isSelected : false;
        });
      } else {
        let answer = state[questionIndex].answers[answerIndex];
        answer.isSelected = !answer.isSelected;
      }
    },

    // Save a free-text answer to a question.
    saveAnswer: (state, action) => {
      const { questionIndex, answer } = action.payload;
      state[questionIndex].answers[0].option = answer;
    },
  },
});

export const { initializeAnswers, toggleAnswer, saveAnswer } =
  answersSlice.actions;
export default answersSlice.reducer;
