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
