import React from 'react'

export function EntryTotalTime(props)
{
	return(
		<input
			value={props.durationVal}
			type='text'
			data-type-2={props.dataType2}
			data-type='duration'
			onChange={props.onChange}
			onBlur={props.onBlur}
		/>
	)
}