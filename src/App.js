import React, { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [isQuizStart, setIsQuizStart] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

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

  var timer;
  useEffect(() => {
    timer = setInterval(() => {
      setSeconds(seconds + 1);
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const restart = () => {
    setMinutes(0);
    setSeconds(0);
  };
  const stop = () => {
    clearInterval(timer);
  };
  const clickHandler = () => {
    setIsQuizStart(true);
    restart();
  };
  console.log(minutes);
  console.log(seconds);
  return (
    <div className="flex-div">
      {!isQuizStart && (
        <button className="start-btn" onClick={clickHandler}>
          Start Quiz
        </button>
      )}
      {isQuizStart && (
        <Quiz
          questions={quizData}
          stop={stop}
          minutes={minutes}
          seconds={seconds}
        />
      )}
    </div>
  );
}
export default App;
