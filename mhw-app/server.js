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

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues

// to validate object IDs
const { ObjectID } = require('mongodb')











// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

//start listening
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})