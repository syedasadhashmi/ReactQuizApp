import React, { useState, useEffect } from "react";
import Quiz from "./Components/Quiz";
import "./App.css";

function App(props) {
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
    let timer;
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

  const restart = () => {
    setMinutes(0);
    setSeconds(0);
  };
  const stop = () => {
    setStatus(false);
  };

  const clickHandler = () => {
    setStatus(true);
    setIsQuizStart(true);
    restart();
  };

  return (
    <div className="flex-div">
      {/* {
        <h5>
          {minutes}: {seconds}
          <button onClick={stop}>Stop</button>
        </h5>
      } */}
      {!isQuizStart ? (
        <button className="start-btn" onClick={clickHandler}>
          Start Quiz
        </button>
      ) : (
        isQuizStart && (
          <Quiz
            questions={quizData}
            stop={stop}
            minutes={minutes}
            seconds={seconds}
          />
        )
      )}
    </div>
  );
}
export default App;
