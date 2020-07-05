import React from 'react'

export function EntryDetails(props)
{
	return(
		<span className='entry--toggle-more-container'>
			{props.numEntries > 1 &&
				<a href='#' onClick={props.showHideEntries} className='entry--toggle-more'>
					{props.numEntries}
				</a>
			}
		</span>
	)
} 