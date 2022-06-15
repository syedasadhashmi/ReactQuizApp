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
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return setAnswer(array);
  }

  useEffect(() => {
    let arr = [];
    props.questions[newQuestion].incorrect_answers.map((items) =>
      arr.push(items)
    );
    arr.push(props.questions[newQuestion].correct_answer);
    console.log(props.questions[newQuestion].correct_answer);
    shuffle(arr);
  }, [props.questions, newQuestion]);

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
  };

  return (
    <div className="center-div">
      {!isFinish && (
        <div>
          <h4>Question# {count}</h4>
          <p>{props.questions[newQuestion].question}</p>
          <ul className="list-style">
            {answer.map((ans, i) => (
              <li key={i}>
                <label onChange={changeLabelHandler}>
                  <input type="radio" name={newQuestion} value={ans} />
                  {ans}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!isResult && (
        <button onClick={changeHandler} type="submit">
          Next
        </button>
      )}

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
