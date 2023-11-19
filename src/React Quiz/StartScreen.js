
import { useQuiz } from './contextApiAndReducer/ContextApiReducer'



function StartScreen() {

	const {numQuestions, dispatch} = useQuiz()


  return (
	<div>
		<h2>Welcome to the React Quiz!</h2>
		<h3>{numQuestions} question to test your React mastery</h3>
		<button className='btn btn-ui' onClick={()=>dispatch({type: "start"})}>Let's start</button>
	</div>
  )
}

export default StartScreen