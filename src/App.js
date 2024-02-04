import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import NewQuiz from "./components/NewQuiz";
import MyQuizzes from "./components/MyQuizzes/MyQuizzes";
import Quiz from "./components/Quiz";
import Login from "./components/Login";
import Result from "./components/Result";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Handler to determine the route's element based on login status
  const handleRoute = (Component) =>
    isLoggedIn ? <Component /> : <Navigate to="/login" />;

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={handleRoute(Home)} />
        <Route path="/new" element={handleRoute(NewQuiz)} />
        <Route path="/quizzes" element={handleRoute(MyQuizzes)} />
        <Route path="/quiz/:id" element={handleRoute(Quiz)} />
        <Route path="/result" element={handleRoute(Result)} />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
