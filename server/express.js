const express = require('express')
const app = express()
const mongoose = require('mongoose')
//const path = require('path');

app.use(express.static('client/dist'))

app.listen(3000, () => console.log('Example app listening at http://localhost:3000'))

mongoose.connect('mongodb://127.0.0.1:27017', {useNewUrlParser: true, useUnifiedTopology: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))

const Schema = new mongoose.Schema({name:String})
const Developer = mongoose.model('Developer', Schema)
const developer = new Developer({name: 'Dev'})
console.log(developer)