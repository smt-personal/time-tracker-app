import React, { Component } from 'react'
import { secsToHHMMSS, getTaskEntryTime, dateNumToStr } from './../../funcs'
import { Task } from './Task'

export class Day extends React.Component
{
	constructor(props)
	{
		super(props);

		// this.state = {
		// 	daysTasks: this.props.daysTasks
		// }
	}

	componentDidUpdate()
	{
		// this.setState({
		// 	daysTasks: this.props.daysTasks
		// }, () => {
			//console.log(this.state.daysTasks)
		//});
	}

	render()
	{
		let daysTotTime = 2
		let taskTotal = 0
		let daysTotalTime, entryDur

		daysTotalTime = this.props.daysTasks.reduce((acc,curr) => {
			taskTotal += curr.entries.reduce((acc2,curr2) => {
				entryDur = getTaskEntryTime(curr2.startTime, curr2.endTime)
				return acc2 + entryDur
			},0)

			return taskTotal
		},0)
		
		daysTotalTime = secsToHHMMSS(daysTotalTime)

		let now = new Date(Date.now())
		let today = '' + now.getFullYear() + (now.getMonth() + 1) + ('0' + now.getDate()).slice(-2);
		let ftdDate = this.props.date === parseInt(today) ? 
			'Today' : 
			this.props.date.toString().replace(/(\d{4})(\d{2})(\d{2})/, '$1/$2/$3')
	
		return (
			<div className="day">
				<div className="day--header">
					<span className='day--header-day'>{ftdDate}</span>
					<span className='day--header-total-time'>Total: {daysTotalTime}</span>
				</div>
				<div className="day--task">
					{this.props.daysTasks.map((el, idx) => {
					 	return (
					 		<Task 
					 			taskName={el.taskName} 
					 			entries={el.entries} 
					 			deleteTask={(evt,dt,tn,en) => this.props.deleteTask(this.props.date, tn, en)}
					 			key={idx} 
					 			restartTask={this.props.restartTask}
					 			taskTimeOnBlur={(e,tmTyp,eId) => this.props.taskTimeOnBlur(e,tmTyp,eId,idx)}
					 		/>
					 	)
					})}
				</div>
			</div>
		)
	}
}