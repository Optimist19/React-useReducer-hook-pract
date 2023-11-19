
import Options from './Options'

import { useQuiz } from './contextApiAndReducer/ContextApiReducer'

function Question() {

	const {questions, index} = useQuiz()

	const question = questions.at(index)

  return (
	<div>
		<h4>{question.question}</h4>

		<div className='options'>
			<Options question={question}  />
		</div>
	</div>
  )
}

export default Question