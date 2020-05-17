/* /* Holds Mongoose connection to be accessed by express server.*/
const mongoose = require('mongoose')

/* Connnect to our database */
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });


module.exports = { mongoose }  // Export the active connection.