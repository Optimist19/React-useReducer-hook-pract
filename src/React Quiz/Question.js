import React from 'react'
import Options from './Options'
import { useCustomContextApiHook } from './ContextAndReducer/ContextAndReducer'

function Question() {
	// console.log(question)

	const {question, dispatch, answer} = useCustomContextApiHook()

  return (
	<div>
		<h4>{question.question}</h4>

		<div className='options'>
			<Options question={question} dispatch={dispatch} answer={answer} />
		</div>
	</div>
  )
}

export default Question