import React from "react";
import { useCustomContextApiHook } from './ContextAndReducer/ContextAndReducer'

function Options() {
  const { question, dispatch, answer } = useCustomContextApiHook()
  const hasAnswered = answer !== null;

  return (
    <div>
      {question.options.map((option, index) => {
        return (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            key={option}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            disabled={hasAnswered}>
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
