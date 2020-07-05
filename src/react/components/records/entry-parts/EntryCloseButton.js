import React from 'react'

export function EntryCloseButton(props)
{
	return (
		<div 
			onClick={(dt,tn,en) => this.props.deleteTask(null, this.props.taskName, this.props.entryIdx)}
		>X</div>
	)
}