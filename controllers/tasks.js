//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const taskRouter = express.Router() 
const Task = require('../models/task')

//Mongo Connect
mongoose.connect(process.env.DATABASE_URL)

// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));


//INDUCES
//Index
taskRouter.get('/home', async (req,res) => {
    const allTasks = await Task.find({})
    res.render('index.ejs', {
        task: allTasks
    })
})

//New
taskRouter.get('/new', (req, res)=>{
    res.render('new.ejs')
})

//Delete
taskRouter.delete('/:id', async (req,res)=>{
    await Task.findByIdAndRemove(req.params.id)
    res.redirect('/home')
})

//Update
taskRouter.put('/:id', async (req,res)=>{
    await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
    )
    res.redirect('/home')
})

//Create
taskRouter.post('/', async (req, res)=>{
    const newTask = new Task({
        task: req.body.task})
   await newTask.save().then(res.redirect ('/home'))
})

//Edit
taskRouter.get('/:id/edit', async (req, res)=>{
    const id = req.params.id
    const selectedTask = await Task.find({})
    res.render('edit.ejs', {
        task: selectedTask,
        taskID: id,
    })
})

//Exports
module.exports = taskRouter