import React from 'react'

export function EntryPlayButton(props)
{
	return (
		<div 
			className='entry--item playBtn' 
			onClick={props.onClick}
		></div>
	)
}