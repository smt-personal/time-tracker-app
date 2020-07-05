import React, { Component } from 'react'
import { secsToHHMMSS, getTaskEntryTime } from './../../funcs'
import { Entry } from './Entry'

export class Task extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			entriesVisible: false
		}

		this.showHideEntries = this.showHideEntries.bind(this);
	}

	render()
	{
		//console.log(this.props.taskName, this.props.entries)
		//let totTime = this.props.entries.reduce((acc, ent) => acc + ent.duration, 0);
		let taskStartTime = this.props.entries.length === 1 ? 
			this.props.entries[0].startTime : 
			this.props.entries.reduce((prev, curr) => {
				return prev.startTime < curr.startTime ? prev.startTime : curr.startTime;
			})

		let taskEndTime = this.props.entries.length === 1 ? 
			this.props.entries[0].endTime : 
			this.props.entries.reduce((prev, curr) => {
				return prev.endTime > curr.endTime ? prev.endTime : curr.endTime;
			})

		let taskEntryTime = 0;
		let totalTaskTime = this.props.entries.reduce((acc, curr) => {
			taskEntryTime = getTaskEntryTime(curr.startTime, curr.endTime);

			return acc + taskEntryTime;
		},0);

		totalTaskTime = this.props.entries.length === 1 ? 
			null : 
			secsToHHMMSS(totalTaskTime);

		return (
			<div className="task">
				<Entry
					taskName={this.props.taskName}
					deleteTask={this.props.deleteTask}
					startTime={taskStartTime}
					endTime={taskEndTime}
					totalTaskTime={totalTaskTime}
					type='head'
					deleteTask={this.props.deleteTask}
					numEntries={this.props.entries.length}
					entryIdx={null}
					restartTask={this.props.restartTask}
					showHideEntries={this.showHideEntries}
					readOnly={this.props.entries.length > 1}
					taskTimeOnBlur={
						this.props.entries.length === 1 ?
							(e,tmTyp) => this.props.taskTimeOnBlur(e,tmTyp,0) :
							null
					}
				/>
				<div className={this.state.entriesVisible ? 'entry--hidden-entries' : 'entry--hidden-entries is-hidden'} >
					{this.props.entries.length > 1 && this.props.entries.map((entry, idx) => 
 						<Entry
 							readOnly={false}
							taskName={this.props.taskName}
							startTime={entry.startTime}
							endTime={entry.endTime}
							deleteTask={this.props.deleteTask}
							entryIdx={idx}
							key={idx}
							type="entry"
							restartTask={this.props.restartTask}
							taskTimeOnBlur={(e,tmTyp) => this.props.taskTimeOnBlur(e,tmTyp,idx)}
						/>
					)}
				</div>
 			</div>
		)
	}

	

	showHideEntries(event)
	{
		event.preventDefault();

		this.setState({
			entriesVisible: !this.state.entriesVisible
		})
	}

	
}