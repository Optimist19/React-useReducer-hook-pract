import React from "react";

import { useQuiz } from "./contextApiAndReducer/ContextApiReducer";

function Options({question}) {
  const { dispatch, answer } = useQuiz()
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
