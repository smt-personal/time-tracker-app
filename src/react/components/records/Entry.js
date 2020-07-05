import React, { Component } from 'react'
import { EntryToFrom } from './entry-parts/EntryToFrom'
import { EntryDetails } from './entry-parts/EntryDetails'
import { EntryTotalTime } from './entry-parts/EntryTotalTime'
import { EntryTaskName } from './entry-parts/EntryTaskName'
import { EntryPlayButton } from './entry-parts/EntryPlayButton'
import { EntryCloseButton } from './entry-parts/EntryCloseButton'
import { tsToTime, secsToHHMMSS, getTaskEntryTime } from './../../funcs'

export class Entry extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			startTime: this.props.startTime,
			endTime: this.props.endTime
		}

		this.timeOnChange = this.timeOnChange.bind(this);
		this.timeOnBlur = this.timeOnBlur.bind(this);
		this.durationOnChange = this.durationOnChange.bind(this);
		this.durationOnBlur = this.durationOnBlur.bind(this);
	}

	render()
	{	
		let startTimeVal = tsToTime(this.props.startTime)
		let endTimeVal = tsToTime(this.props.endTime)
		let durInSecs = (Math.floor(this.props.endTime / 1000) - Math.floor(this.props.startTime / 1000))
		durInSecs = durInSecs === 0 ? 1 : durInSecs  
		let durationVal = secsToHHMMSS(durInSecs)

		const {startValue, endValue, duration} = this.state;

		return (
			<div className={this.props.type === 'head' ? 'entry is-head' : 'entry'}>
				<div className='entry--item'>
					<EntryDetails
						numEntries={this.props.numEntries}
						showHideEntries={this.props.showHideEntries}
					/>
				</div>
				<div className='entry--item entry--item-name'>
					<EntryTaskName 
						taskName={this.props.taskName} 
					/>
				</div> 
				<div className='entry--item entry--timestamps'>
					<EntryToFrom 
						startTimeVal={startTimeVal}
						endTimeVal={endTimeVal}
						readOnly={this.props.readOnly}
						timeOnChange={this.timeOnChange}
						timeOnBlur={this.timeOnBlur}
					/>
				</div>
				<div className="entry--item totTime">
					<EntryTotalTime
						durationVal={durationVal}
						dataType2={this.props.type}
						onChange={this.durationOnChange}
						onBlur={this.durationOnBlur}
					/>
				</div>
				<div className='entry--item'>
					<EntryPlayButton
						onClick={(tn) => this.props.restartTask(this.props.taskName)}
					/>
				</div>
				{/*<div className='entry--item'>
					<EntryCloseButton
						onClick={(dt,tn,en) => this.props.deleteTask(null, this.props.taskName, this.props.entryIdx)}
					/>
				</div>*/}
			</div>
		)
	}

	timeOnChange(e)
	{
		if(e.target.dataset.type === "startTime"){
			
			this.setState({
				startTimeVal: e.target.value
			})

		}else if(e.target.dataset.type === "endTime"){
			
			this.setState({
				endTimeVal: e.target.value
			});
		}
	}

	timeOnBlur(e){
		
		if(e.target.value.match(/^\d{1,2}:\d{2}[aAPp][mM]$/)){
			//console.log("match")
			let ts = TimeToTimeStamp(e.target.value);
			
			if(e.target.dataset.type === "startTime"){
				//console.log("start time")
				this.setState({
					startTime: ts,

					
				})
			}else if(e.target.dataset.type === "endTime"){
				//console.log("end time")
				this.setState({
					endTime: ts,
					// endTime: this.state.startTime + totalSecs,
					// endTimeVal: tsToTime(this.state.startTime + totalSecs)
				});
			}


		}else{
			let oldVal;

			if(e.target.dataset.type === "startTime"){
				oldVal = tsToTime(this.state.startTime);

				this.setState({
					startTimeVal: oldVal
				})

			}else if(e.target.dataset.type === "endTime"){
				oldVal = tsToTime(this.state.endTime);

				this.setState({
					endTimeVal: oldVal
				});
			}
		}
	}

	durationOnChange(e){
		this.setState({
			durationVal: e.target.value
		})
	}

	durationOnBlur(e){

		if(e.target.value.match(/^\d*:[0-5][0-9]:[0-5][0-9]$/)){
			const totalSecs = HHMMSSToSecs(e.target.value);
			this.setState({
				durationVal: e.target.value,
				endTime: this.state.startTime + totalSecs,
				endTimeVal: tsToTime(this.state.startTime + totalSecs)
			});
		}else{
			this.setState({
				durationVal: secsToHHMMSS(getTaskEntryTime(this.state.startTime, this.state.endTime))
			})
		}
	}

	
}