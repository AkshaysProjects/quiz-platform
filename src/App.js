import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import NewQuiz from "./components/NewQuiz";
import MyQuizzes from "./components/MyQuizzes";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import Result from "./components/Result";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/new" element={<NewQuiz />} />
          <Route exact path="/quizzes" element={<MyQuizzes />} />
          <Route exact path="/quiz/:id" element={<Quiz />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/result" element={<Result />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
