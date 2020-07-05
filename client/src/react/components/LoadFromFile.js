import * as React from 'react'

export class LoadFromFile extends React.Component{
	render() {
		return (
			<button 
				id='loadFromFile' 
				onClick={this.props.loadFromFile}
				className='button'
			>
				Load
			</button>
		)
	}
}