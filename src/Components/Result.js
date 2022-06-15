import { useState } from "react";
import App from "../App";
import "./Result.css";

const Result = (props) => {
  const [isShow, setIsShow] = useState(false);
  const minutes = props.minutes;
  const seconds = props.seconds;
  const changeStateHandler = () => {
    setIsShow(true);
  };
  return (
    <div className="centrDiv">
      {!isShow && (
        <>
          <h4>
            Your Score is {props.answer} out Of {props.count}
          </h4>
          <h5>
            Time Taken To Finish:
            {minutes < 10 ? "0" + minutes : minutes}:
            {seconds < 10 ? "0" + seconds : seconds}
          </h5>
          <button onClick={changeStateHandler}>Play Again</button>
        </>
      )}
      {isShow && <App />}
    </div>
  );
};
export default Result;
