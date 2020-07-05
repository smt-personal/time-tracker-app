import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './react/components/App'
import './smacss/main.scss'


// import { Task } from './mongoose/TaskSchema'
// import { dummyRecs } from './mongoose/dummyRecs_old' 
// import mongoose from 'mongoose'


// const Schema = new mongoose.Schema({name:String})
// const Developer = mongoose.model('Developer', Schema)
// const developer = new Developer({name: 'Test'})

// Developer.methods.add = function(name, callback){
//     this.name = name;
//     return this.save(callback);
// }

// const taskSchema = new mongoose.Schema({
// 	date: Date,
// 	tasks: [{
// 		taskName: String,
// 		project: String,
// 		entries: [{
// 			startTime: Date,
// 			endTime: Date
// 		}]
// 	}]
// })

// const Task = mongoose.model('Task', taskSchema)

// dummyRecs.forEach(taskData => {
// 	let task = new Task(taskData)

// 	task.save(function(err, res){
// 		if (err) console.log(err)

// 		console.log('saved')
// 	})
// })



// Task.find(function(err, tasks){
// 	if (err) console.log(err)
// 	console.log(tasks)
// })

// console.log(Task, 'here')
ReactDOM.render(<App />, document.getElementById('root'));

