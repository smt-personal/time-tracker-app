import React from 'react'

export function EntryToFrom(props)
{
	return (
		<div>
			<input
				value={props.startTimeVal} 
				className='entry--timestamp'
				readOnly={props.readOnly}
				data-type='startTime'
				type='text'
				onChange={props.timeOnChange}
				onBlur={props.timeOnBlur} 
			/> - 
			<input 
				value={props.endTimeVal}
				className='entry--timestamp'
				readOnly={props.readOnly}
				data-type='endTime'
				type='text' 
				onChange={props.timeOnChange} 
				onBlur={props.timeOnBlur} 
			/>
		</div>
	)
}