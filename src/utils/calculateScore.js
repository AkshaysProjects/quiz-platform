const calculateScore = (questions, answers) => {
  let score = 0;

  questions.forEach((question, index) => {
    if (question.type === "Short" || question.type === "Descriptive") {
      // For short and descriptive questions, compare the text directly.
      if (
        question.answers[0].option.trim().toLowerCase() ===
        answers[index].answers[0].option.trim().toLowerCase()
      ) {
        score += 1;
      }
    } else {
      // For MCQ questions, compare isSelected and isCorrect.
      const correctAnswers = question.answers
        .filter((ans) => ans.isCorrect)
        .map((ans) => ans.option);
      const selectedAnswers = answers[index].answers
        .filter((ans) => ans.isSelected)
        .map((ans) => ans.option);

      if (
        selectedAnswers.length === correctAnswers.length &&
        selectedAnswers.every((opt) => correctAnswers.includes(opt))
      ) {
        score += 1;
      }
    }
  });

  return score;
};

export default calculateScore;
