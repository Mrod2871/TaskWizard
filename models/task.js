const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: {type: String, required: true },
    start: {type: Date, required: true},
    end: {type: Date, required: true},
})
const Task = mongoose.model('Task', taskSchema)

module.exports = Task