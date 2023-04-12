//Dependencies
const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const app = express()
require('dotenv').config()

//Mongoose Connect
mongoose.connect(process.env.DATABASE_URL)

//Database Connection Error/Success
//Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"))
app.use('/public', express.static('public'))

//Controllers

//App Listener
const PORT = process.env.PORT
app.listen(PORT, ()=>
console.log(`Server is running on port: ${PORT}`))