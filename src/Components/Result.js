import { useState } from "react";
import App from "../App";

const Result = (props) => {
  const [isShow, setIsShow] = useState(false);
  const changeStateHandler = () => {
    setIsShow(true);
  };
  return (
    <div>
      {!isShow && (
        <>
          <h4>
            Your Score is {props.answer} out Of {props.count}
          </h4>
          <button onClick={changeStateHandler}>Play Again</button>
        </>
      )}
      {isShow && <App />}
    </div>
  );
};
export default Result;
