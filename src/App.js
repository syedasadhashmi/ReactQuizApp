import React, { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [isQuizStart, setIsQuizStart] = useState(false);
  const fetchData = () => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let arr = data.results;
        setQuizData(arr);
        // console.log(arr);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const clickHandler = () => {
    setIsQuizStart(true);
  };
  return (
    <div className="flex-div">
      {!isQuizStart && (
        <button className="start-btn" onClick={clickHandler}>
          Start Quiz
        </button>
      )}
      {isQuizStart && <Quiz questions={quizData} />}
    </div>
  );
}

export default App;
