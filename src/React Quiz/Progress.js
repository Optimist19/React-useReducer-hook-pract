import React from 'react'
import { useCustomContextApiHook } from './ContextAndReducer/ContextAndReducer'

function Progress() {

	const {index, numQuestions, points, maxPossiblePoints, answer} = useCustomContextApiHook()

  return (
	<header className='progress'>

		{/* <progress max={numQuestions} value={index} /> */}
		<progress max={numQuestions} value={index + Number(answer !== null)} />

		<p>
			Question <strong>{index + 1}</strong> / {numQuestions}
		</p>

		<p>
			<strong>{points}</strong> / {maxPossiblePoints}
		</p>
	</header>
  )
}

export default Progress