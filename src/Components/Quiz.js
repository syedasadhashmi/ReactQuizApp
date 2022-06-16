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
  // const [isChecked, setIsChecked] = useState(false);

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
  function toggleOption(id, checked) {
    return answer.map((option) =>
      option.id === id ? { ...option, checked } : option
    );
  }

  const changeList = (id, checked) => {
    const newCheckedList = toggleOption(id, checked);
    // console.log(newCheckedList);
    setAnswer(newCheckedList);
  };
  function randomSelect(arr) {
    const arrObj = arr.map((items, i) => ({
      name: items,
      id: i + 1,
    }));
    // setAnswer(arr1);
    // console.log(arrObj);
    // return arr1;
    shuffle(arrObj);
  }
  useEffect(() => {
    let arr = [];
    props.questions[newQuestion].incorrect_answers.map((items) =>
      arr.push(items)
    );
    arr.push(props.questions[newQuestion].correct_answer);
    console.log(props.questions[newQuestion].correct_answer);
    randomSelect(arr);
    // shuffle(arr);
  }, [props.questions, newQuestion]);

  const changeLabelHandler = (e) => {
    let choosenAnswer = e.target.value;

    if (props.questions[newQuestion].correct_answer === choosenAnswer) {
      setIsCheckAnswer(true);
    } else {
      setIsCheckAnswer(false);
    }
  };
  // const radioChange = (e) => {

  // };

  const checkOverallScore = () => {
    setIsFinish(true);
    props.stop();
  };
  // console.log(answer, "ans");
  return (
    <div className="center-div">
      {!isFinish && (
        <div>
          <h4>Question# {count}</h4>
          <p>{props.questions[newQuestion].question}</p>
          <ul className="list-style">
            {answer.map(({ name, id, checked }) => (
              <li key={id}>
                <label onChange={changeLabelHandler}>
                  <input
                    type="radio"
                    name={newQuestion}
                    value={name}
                    checked={checked}
                    onChange={(e) => changeList(id, e.target.checked)}
                  />
                  {name}
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
