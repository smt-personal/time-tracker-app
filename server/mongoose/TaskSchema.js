const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
	date: Date,
	tasks: [{
		taskName: String,
		project: String,
		entries: [{
			startTime: Date,
			endTime: Date
		}]
	}]
})

export const Task = mongoose.model('Task', taskSchema)

