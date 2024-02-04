import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    title: "",
    description: "",
    questions: [],
    isActive: true,
  },
  reducers: {
    // Sets the entire quiz state from payload
    setQuiz: (state, action) => {
      Object.assign(state, action.payload);
    },

    // Adds a new question to the quiz
    addQuestion: (state, action) => {
      const questionType = action.payload.questionType;
      state.questions.push({
        question: "",
        answers: [{ option: "", isCorrect: action.payload !== "MCQ" }],
        type: questionType,
        isActive: true,
      });
    },

    // Deletes a question from the quiz
    deleteQuestion: (state, action) => {
      state.questions.splice(action.payload.questionIndex, 1);
    },

    // Edits a specific question in the quiz
    editQuestion: (state, action) => {
      const { questionIndex, value } = action.payload;
      state.questions[questionIndex].question = value;
    },

    // Toggles the active state of a question
    toggleActive: (state, action) => {
      const { questionIndex } = action.payload;
      state.questions[questionIndex].isActive =
        !state.questions[questionIndex].isActive;
    },

    // Adds a new answer to a specific question
    addAnswer: (state, action) => {
      state.questions[action.payload.questionIndex].answers.push({
        option: "",
        isCorrect: false,
      });
    },

    // Edits a specific answer of a question
    editAnswer: (state, action) => {
      const { questionIndex, answerIndex, value } = action.payload;
      state.questions[questionIndex].answers[answerIndex].option = value;
    },

    // Deletes a specific answer from a question
    deleteAnswer: (state, action) => {
      const { questionIndex, answerIndex } = action.payload;
      state.questions[questionIndex].answers.splice(answerIndex, 1);
    },

    // Toggles the correctness of a specific answer
    toggleIsCorrect: (state, action) => {
      const { questionIndex, answerIndex } = action.payload;
      state.questions[questionIndex].answers[answerIndex].isCorrect =
        !state.questions[questionIndex].answers[answerIndex].isCorrect;
    },
  },
});

// Export actions and reducer
export const {
  setQuiz,
  addQuestion,
  deleteQuestion,
  editQuestion,
  toggleActive,
  addAnswer,
  editAnswer,
  deleteAnswer,
  toggleIsCorrect,
} = quizSlice.actions;
export default quizSlice.reducer;
