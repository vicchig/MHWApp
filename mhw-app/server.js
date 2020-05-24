'use strict'
const log = console.log

const express = require('express')
const bodyParser = require('body-parser') 
const cors = require('cors')
const app = express()

//.env file load
require('dotenv').config()

// Setting up a static directory for the html file in /pub
// using Express middleware
app.use(express.static(__dirname + '/pub'))
// Serve the build
app.use(express.static(__dirname + "/client/build"));

//parsers and session 
app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/xml' }))
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
app.use(bodyParser.json({ type: 'application/*+json' }))
app.use(bodyParser.urlencoded({ extended: true }))

//cors
app.use(cors())

// to validate object IDs
const { ObjectID } = require('mongodb')

//routes
const newsitemRoutes = require('./routes/newsitems')
app.use('/newsitem', newsitemRoutes)

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues










//start listening
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})