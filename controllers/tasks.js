//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const taskRouter = express.Router() 
const Task = require('../models/task')

const taskArray = require('../tasksArray')

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
taskRouter.get('/home', (req,res) => {
    res.render('index.ejs')
})

//New
taskRouter.get('/new', (req, res)=>{
    res.render('new.ejs')
})

//Delete
taskRouter.delete('/:id', async (req,res)=>{
    await Task.findByIdAndRemove(req.params.id)
    res.redirect('/show')
})

//Update
taskRouter.put('/:id', async (req,res)=>{
    await Task.findByIdAndUpdate(
        req.params.id,
        req.body
    )
    res.redirect(`/show/${req.params.id}`)
})

//Create
taskRouter.post('/', (req, res)=>{
    const newTask = new Task(req.body)
    newTask.save().then(res.redirect ('/show'))
})

//Edit
taskRouter.get('/show/:id/edit', async (req, res)=>{
    const selectedTask = await Task.findById(req.params.id)
    res.render('edit.ejs', {
        task: selectedTask,
    })
})

//SHOW
taskRouter.get('/:id', async (req,res)=>{
    const selectedTask = await Task.findById(req.params.id).exec()
    res.render('show.ejs', {
        task: selectedTask,
    })
})

//Exports
module.exports = taskRouter