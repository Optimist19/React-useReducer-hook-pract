// import DateCounter from "./DateCounter/DataCounter";

import { useEffect, useReducer } from "react";

import Header from "./React Quiz/Header";
import Main from "./React Quiz/Main";
import Loader from "./React Quiz/Loader";
import Error from "./React Quiz/Error";
import StartScreen from "./React Quiz/StartScreen";
import Question from "./React Quiz/Question";
import NextButton from "./React Quiz/NextButton";
import Progress from "./React Quiz/Progress";
import FinishScreen from "./React Quiz/FinishScreen";
import Footer from "./React Quiz/Footer";
import Timer from "./React Quiz/Timer";
import Challenge from "./Challenge/Challenge";
import DateCounter from "./DateCounter/DataCounter";


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

function App() {
  // const [state, dispatch] = useReducer(reducer, initialState)
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch
  ] = useReducer(reducer, initialState);

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

  return (
    <div className="app">
      <DateCounter />
      
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && <StartScreen />}
          {/* {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={ques}/>} */}
          {status === "active" && (
            <>
              <Progress />
              <Question />
              <Footer>
                <Timer />
                <NextButton />
              </Footer>
            </>
          )}

          {status === "finished" && <FinishScreen />}
        </Main>
      <br />
      <h1>Challenge</h1>
      <Challenge />
    </div>
  );
}

export default App;
