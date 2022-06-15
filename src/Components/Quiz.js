import React, { useEffect, useState } from "react";
import "./Quiz.css";
import Result from "./Result";

const Quiz = (props) => {
  const [newQuestion, setNewQuestion] = useState(0);
  const [isResult, setIsResult] = useState(false);
  const [isCheckAnswer, setIsCheckAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinish, setIsFinish] = useState(false);
  const [answer, setAnswer] = useState([]);
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
    if (isCheckAnswer) {
      let i = score + 1;
      setScore(i);
    }
    // console.log(score);
  };
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   // const input = e.target.querySelector("input[type=radio]:checked");
  //   // const label = e.target.querySelector("label");
  //   // console.log(label.innerText);
  //   // console.log(input.value);
  //   console.log(isCheckAnswer);
  // };
  // const shuffle = (arr) => {
  //   for (let i = 0; i <= arr.lenngth - 1; i++) {
  //     let index = Math.random() * arr.length;
  //     let temp = arr[i];
  //     arr[i] = arr[index];
  //     arr[index] = temp;
  //   }
  //   return setAnswer(arr);
  //   // console.log(arr);
  // };
  // console.log(props.time);
  // const shuffle = (arr) => {
  //   for (let i = 0; i <= arr.length - 1; i++) {
  //     let index = Math.random() * arr.length;
  //     let temp = arr[i];
  //     arr[i] = arr[index];
  //     arr[index] = temp;
  //   }
  //   setAnswer(arr);
  //   return arr;
  //   //
  // };
  useEffect(() => {
    let arr = [];
    props.questions[newQuestion].incorrect_answers.map((items) =>
      arr.push(items)
    );
    arr.push(props.questions[newQuestion].correct_answer);
    // console.log(arr);
    //
    setAnswer(arr);
    // console.log("first");
    // console.log(arr);
    // console.log(shuffle(arr));
    // return () => {
    //   arr = [];
    // };
  }, [props.questions, newQuestion]);
  // useEffect(() => {
  //   // console.log("seconnd");
  //   // console.log(shuffle(answer));
  //   for (let i = 0; i <= answer.length - 1; i++) {
  //     let index = Math.random() * answer.length;
  //     let temp = answer[i];
  //     answer[i] = answer[index];
  //     answer[index] = temp;
  //   }
  //   setAnswer(answer);
  // }, [answer]);
  // console.log(answer);
  // console.log(arr[Math.floor(Math.random() * arr.length)]);
  const changeLabelHandler = (e) => {
    let choosenAnswer = e.target.value;

    if (props.questions[newQuestion].correct_answer === choosenAnswer) {
      setIsCheckAnswer(true);
    } else {
      setIsCheckAnswer(false);
    }
  };
  const checkOverallScore = () => {
    setIsFinish(true);
    props.stop();
    // clearInterval(props.time);
    // console.log(props.pop);
    // console.log(props.sec);
  };
  return (
    <div className="center-div">
      {!isFinish && (
        <div>
          <h4>Question# {count}</h4>
          <p>{props.questions[newQuestion].question}</p>
          <ul className="list-style">
            {/* {props.questions[newQuestion].incorrect_answers.map((ans, i) => ( */}
            {answer.map((ans, i) => (
              <li key={i}>
                <label onChange={changeLabelHandler}>
                  <input type="radio" name={newQuestion} value={ans} />
                  {ans}
                </label>
              </li>
            ))}
            {/* <li>
              <label onChange={changeLabelHandler}>
                <input
                  type="radio"
                  name={newQuestion}
                  value={props.questions[newQuestion].correct_answer}
                />
                {props.questions[newQuestion].correct_answer}
              </label>
            </li> */}
          </ul>
        </div>
      )}
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
      {isResult && !isFinish && (
        <button type="button" onClick={checkOverallScore}>
          Finish
        </button>
      )}
      {isFinish && (
        <Result
          answer={score}
          count={count}
          minutes={props.minutes}
          seconds={props.seconds}
        />
      )}
    </div>
  );
};
export default Quiz;
