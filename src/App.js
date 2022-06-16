import React, { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState([]);
  const [isQuizStart, setIsQuizStart] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [status, setStatus] = useState(false);

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

  useEffect(() => {
    var timer;
    if (status) {
      timer = setInterval(() => {
        setSeconds(seconds + 1);
        if (seconds === 59) {
          setMinutes(minutes + 1);
          setSeconds(0);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [minutes, seconds, status]);

  // console.log("a");
  const restart = () => {
    setMinutes(0);
    setSeconds(0);
  };
  const stop = () => {
    // changeStatus(false);
    setStatus(false);
    // clearInterval(timer);
  };
  // const startTimer = () => {
  //   timer = setInterval(() => {
  //     setSeconds((seconds) => seconds + 1);
  //   }, 1000);
  // };
  // const changeStatus = (e) => {
  //   console.log(e);
  //   return setStatus(e);
  // };
  const clickHandler = () => {
    // changeStatus(true);
    // console.log(status);
    setStatus(true);
    setIsQuizStart(true);
    // startTimer();
    restart();
  };
  // console.log("a");
  return (
    <div className="flex-div">
      {/* {
        <h5>
          {minutes}: {seconds}
          <button onClick={stop}>Stop</button>
        </h5>
      } */}
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
