import React, { useState } from "react";
import "./Quiz.css";

const Quiz = (props) => {
  const [newQuestion, setNewQuestion] = useState(0);
  const [isResult, setIsResult] = useState(false);
  const [isCheckAnswer, setIsCheckAnswer] = useState(false);
  const [score, setScore] = useState(0);
  // const [answer, setAnswer] = useState([]);
  const [count, setCount] = useState(1);
  // const finishHandler = () => {
  //   setIsResult(true);
  // };

  // console.log(props.questions.length);
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
  const submitHandler = (e) => {
    e.preventDefault();
    // const input = e.target.querySelector("input[type=radio]:checked");
    // const label = e.target.querySelector("label");
    // console.log(label.innerText);
    // console.log(input.value);
    console.log(isCheckAnswer);

    if (isCheckAnswer) {
      let i = score + 1;
      setScore(i);
    }
    console.log(score);
  };
  const changeLabelHandler = (e) => {
    let choosenAnswer = e.target.value;
    if (props.questions[newQuestion].correct_answer === choosenAnswer) {
      setIsCheckAnswer(true);
    } else {
      setIsCheckAnswer(false);
    }
  };
  return (
    <form onSubmit={submitHandler} className="center-div">
      <h4>Question# {count}</h4>
      {
        <div>
          <p>{props.questions[newQuestion].question}</p>
          <ul className="list-style">
            {props.questions[newQuestion].incorrect_answers.map((ans, i) => (
              <li key={i}>
                <label onChange={changeLabelHandler}>
                  <input type="radio" name={newQuestion} value={ans} />
                  {ans}
                </label>
              </li>
            ))}
            <li>
              <label onChange={changeLabelHandler}>
                <input
                  type="radio"
                  name={newQuestion}
                  value={props.questions[newQuestion].correct_answer}
                />
                {props.questions[newQuestion].correct_answer}
              </label>
            </li>
          </ul>
        </div>
      }
      {!isResult && (
        <button onClick={changeHandler} type="submit">
          Next
        </button>
      )}
      {/* <button onClick={changeHandler} type="submit">
        Next
      </button>
      <button type="button" onClick={changeHandler}>
        Finish
      </button> */}
      {isResult && (
        <button type="button" onClick={changeHandler}>
          Finish
        </button>
      )}
    </form>
  );
};
export default Quiz;
