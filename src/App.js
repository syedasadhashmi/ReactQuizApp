import React, { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [isQuizStart, setIsQuizStart] = useState(false);
  // const [minutes, setMinutes] = useState(0);

  const fetchData = () => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let arr = data.results;
        setQuizData(arr);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const clickHandler = () => {
    setIsQuizStart(true);
    // let time = 0;
    // setInterval(() => {
    //   time = minutes + 1;
    //   setMinutes(time);
    // }, 1000);
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
