import React from 'react'

export function Timer(props)
{
	return (
		<div className='timer'>
			<input 
				className='timer--input'
				value={props.taskName} 
				onChange={props.taskNameChange} 
				placeholder="What are you working on?" 
				autoFocus
			/>
			<span>{props.duration}</span>
			<button
				className='timer--button button' 
				onClick={props.startStopTimer}
			>{props.isRunning?"Stop":"Start"}</button>
		</div>
	)
}