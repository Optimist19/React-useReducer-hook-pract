
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
import { useQuiz } from "./React Quiz/contextApiAndReducer/ContextApiReducer";




function App(){

  // const x = useQuiz()
  // console.log(x)

  const {status} = useQuiz()

  return (
    <div className="app">
      {/* <ContextApiReducer> */}
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
      {/* </ContextApiReducer> */}
    </div>
  );
}

export default App;
