/* /* Holds Mongoose connection to be accessed by express server.*/
const mongoose = require('mongoose')

/* Connnect to our database */
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => console.log("Database Connected Successfully"))
.catch(err => console.log('Error connecting to db.'));;


module.exports = { mongoose }  // Export the active connection.