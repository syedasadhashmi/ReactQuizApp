import React, { useState } from "react";
import "./Quiz.css";

const Quiz = (props) => {
  const [newQuestion, setNewQuestion] = useState(0);
  const [isResult, setIsResult] = useState(false);
  // const [score, setScore] = useState(0);
  // const [answer, setAnswer] = useState([]);
  const [count, setCount] = useState(1);
  // const finishHandler = () => {
  //   setIsResult(true);
  // };

  console.log(props.questions.length);
  const changeHandler = () => {
    let quantity = newQuestion + 1;
    let temp = count + 1;
    if (quantity <= props.questions.length - 1) {
      setNewQuestion(quantity);
      setCount(temp);
    } else {
      setIsResult(true);
    }
  };
  return (
    <div className="center-div">
      <h4>Question# {count}</h4>
      {
        <div>
          <p>{props.questions[newQuestion].question}</p>
          <ul className="list-style">
            {props.questions[newQuestion].incorrect_answers.map((ans) => (
              <li>
                <label>
                  <input type="radio" name={newQuestion}></input>
                  {ans}
                </label>
              </li>
            ))}
            <li>
              <label>
                <input type="radio" name={newQuestion}></input>
                {props.questions[newQuestion].correct_answer}
              </label>
            </li>
          </ul>
        </div>
      }
      {!isResult && <button onClick={changeHandler}>Next</button>}
      {isResult && <button>Finish</button>}
    </div>
  );
};
export default Quiz;
