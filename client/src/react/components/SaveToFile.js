import React, { Component } from 'react'

export class SaveToFile extends React.Component{

	render(){

		return(
			<button 
				id='saveToFile' 
				onClick={this.props.saveToFile}
				className='button'
			>
				Save
			</button>
		)
	}
}