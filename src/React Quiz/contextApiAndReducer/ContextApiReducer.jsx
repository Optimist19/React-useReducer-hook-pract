import { createContext, useContext, useEffect, useReducer } from "react";


const quizContextApi = createContext()

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };

    case "dataFailed":
      return {
        ...state,
        status: "error"
      };

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length + SECS_PER_QUESTION
      };

    case "newAnswer":
      const question = state.questions.at(state.index); //Not understood

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points //Not understood
      };

    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore
      };

    case "restart":
      return {
        ...initialState,
        question: state.question,
        state: "ready"
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status
      };

    default:
      throw new Error("Action unknown");
  }
}



function ContextApiReducer({children}) {
  

  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch
  ] = useReducer(reducer, initialState);
  // console.log(questions,"questions")

  const numQuestions = questions.length;

  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" })); //We not interested on the payload for the dataFailed dispatch
  }, []);

  return <quizContextApi.Provider value={{ questions, status, index, answer, points, highscore, secondsRemaining, numQuestions, maxPossiblePoints, dispatch }}>
	{children}
  </quizContextApi.Provider>;
}

function useQuiz(){
	const context = useContext(quizContextApi)
  if (context === undefined)
  throw new Error("QuizContext was used outside of the QuizProvider");
	return context
}

export {ContextApiReducer, useQuiz};
