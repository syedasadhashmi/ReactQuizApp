import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [quizData, setQuizData] = useState([]);
  const fetchData = () => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let arr = data.results;
        setQuizData(arr);
        console.log(arr);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const options = () => {
    let arr = [];
    quizData.map((x) => {
      arr.push(x.correct_answer);
      x.incorrect_answers.map((ans) => {
        arr.push(ans);
      });
    });
    console.log(arr);
  };
  options();
  return (
    <div>
      {quizData.map((x) => (
        <div>
          <p>{x.question}</p>
          <ul>
            {x.incorrect_answers.map((ans) => (
              <li>{ans}</li>
            ))}
            <li>{x.correct_answer}</li>
          </ul>
        </div>
      ))}
    </div>
  );
}

export default App;
