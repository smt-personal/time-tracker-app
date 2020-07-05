import React, { Component } from 'react'

//components
import { Timer } from './Timer'
import { LoadFromFile } from './LoadFromFile'
import { SaveToFile } from './SaveToFile'
import { Day } from './records/Day'

//import { dummyRecs as records } from './../../mongoose/dummyRecs'
import { dummyRecs as records } from './../../../../server/mongoose/dummyRecs_old'
import { secsToHHMMSS, getTaskEntryTime, getCurrentYYYYMMDD } from './../funcs'

export class App extends React.Component
{

	constructor(props)
	{
		super(props) 

		this.state = {
			duration: 0,
			intervalId: null,
			isRunning: false,
			timerRecords: records,
			taskName: 'foo',
			startTime: null,
			endTime: null
		}

		this.startStopTimer = this.startStopTimer.bind(this)
		this.taskNameChange = this.taskNameChange.bind(this)
		this.deleteTask = this.deleteTask.bind(this)
		this.restartTask = this.restartTask.bind(this)
		this.saveToFile = this.saveToFile.bind(this)
	}

	render()
	{
		let durFtd = secsToHHMMSS(this.state.duration);

		return (
			<div className="app">
				<div className="l-container">
					{/*<div className="app--menu">
						<LoadFromFile loadFromFile={this.loadFromFile} />
						<SaveToFile saveToFile={this.saveToFile} />
					</div>*/}
					<Timer 
						startStopTimer={this.startStopTimer}
						isRunning={this.state.isRunning}
						duration={durFtd}
						taskNameChange={(evt) => this.taskNameChange(evt)}
						taskName={this.state.taskName}
					/>
					{this.state.timerRecords.map((el, idx) => {	
						return (
							<div className="app--timerRecords" key={idx}>
								<Day 
									date={el.date} 
									daysTasks={el.tasks} 
									deleteTask={this.deleteTask}
									key={idx} 
									restartTask={this.restartTask}
									taskTimeOnBlur={(e,tmTyp,eId,tId) => this.taskTimeOnBlur(e,tmTyp,eId,tId,idx)}
								/>	
					 		</div>
					 	)
					})}
				</div>
			</div>
		)
	}

	validateTimeInput(e)
	{
		const regExp = /^\d{1,2}:\d{1,2}[A|P]M$/
	}

	saveToFile()
	{
		saveToFile("./lib/dummyRecs2.js", this.state.timerRecords);
		//this.clearLocalStorage();
	}

	taskNameChange(evt)
	{
		//console.log('task name change', evt.target.value)
		this.setState({
			taskName: evt.target.value
		})
	}

	startStopTimer()
	{			
		let intervalId, startTime, timerRecords, endTime;

		if(this.state.isRunning === false)
		{	
			let duration = 0;
			intervalId = window.setInterval(() => {
				duration += 1;

				this.setState({
					duration: duration
				});

			}, 1000);

			this.setState({
				intervalId: intervalId,
				startTime: Date.now(),
				isRunning: true
			})
		}
		else
		{
			clearInterval(this.state.intervalId);

			//console.log('started at', this.state.startTime, 'ended at', endTime)

			let curTaskEntry = {
				startTime: this.state.startTime,
				endTime: Date.now()
			}

			timerRecords  = this.state.timerRecords;

			//console.log('in startStopTimer', this.state.taskName)
			let curTaskName = this.state.taskName
			let curTaskDate = getCurrentYYYYMMDD()
			let hasDate = timerRecords.some(day => day.date === curTaskDate)
			let hasTask = hasDate && timerRecords.some(day => {
				if(day.date === curTaskDate){
					return day.tasks.some(task => task.taskName === curTaskName)
				} 
			})


			if(!hasDate)
			{
				timerRecords.unshift({
					date: curTaskDate,
					tasks: [{
							taskName: curTaskName,
							project: null,
							entries: [curTaskEntry]
						}]
				})
			}
			else if(!hasTask)
			{
				timerRecords.forEach(day => {
					if(day.date === curTaskDate){
						day.tasks.push({
							taskName: curTaskName,
							project: null,
							entries: [curTaskEntry]
						})
					}
				})
			}
			else
			{
				timerRecords.forEach(day => {
					if(day.date === curTaskDate){
						day.tasks.forEach(task => {
							if(task.taskName === curTaskName){
								task.entries.push(curTaskEntry)
							}
						})
					}
				})
			}

			this.setState({
				intervalId: null,
				startTime: null,
				endTime: null,
				taskName: 'foo',
				isRunning: false,
				timerRecords: timerRecords,
				duration: 0
			}, () => {
				if(!this.state.isRunning){
					this.setLocalStorage()
				}
			})
		}

	}

	deleteTask(date, taskName, entryIdx)
	{
		let timerRecords = this.state.timerRecords;

		timerRecords.forEach((el, idx, arr) => {
			if(el.date === date){
				if(el.tasks.length === 1 && (el.tasks.entries.length === 1 || entryIdx === null)){
					arr.splice(idx,1);
				}else{
					el.tasks.forEach(function(el2, idx2){
						if(el2.taskName === taskName){
							if(entryIdx === null || el2.entries.length === 1){
								arr[idx].tasks.splice(idx2,1);
							}else{
								arr[idx].tasks[idx2].entries.splice(entryIdx,1);
							}
						}
					})
				}
			}
		});

		this.setState({
			timerRecords: timerRecords
		}, () => {
			this.setLocalStorage();
		})
	}

	restartTask(taskName){
		this.setState({
			taskName: taskName
		},() => {

			this.startStopTimer();
		});
	}

	setLocalStorage(){
		localStorage.setItem("records", this.state.timerRecords);
	}

	loadFromFile(){
		localStorage.clear();
		location.reload();
	}
}