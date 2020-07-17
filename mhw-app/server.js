'use strict'
const log = console.log

const express = require('express')
const session = require('express-session')
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
const userRoutes = require('./routes/user')
app.use('/newsitem', newsitemRoutes)
app.use('/users', userRoutes)

//session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 300000,
        httpOnly: true
    }
}));

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues


const { User } = require('./models/User')


//POST - Log In
app.post('/log_in', (req, res) => {
	const username = req.body.username
    const password = req.body.password

    if(username === "" || password === ""){
        res.status(400).send()
        return;
    }

    // Use the static method on the User model to find a user
    // by their username and password
	User.findByUsernamePassword(username, password).then((user) => {
	    if (!user) {
            res.status(404).send();
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            res.status(200).send(user);
        }
    }).catch((error) => {
		res.status(500).send();
    })
})

//DELETE - Log Out
app.delete('/logout', (req, res) => {
	// Remove the session
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send()
		} else {
			res.redirect('/')
		}
	})
})

app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.status(200).send({ currentUser: req.session.user});
    } else {
        res.status(401).send();
    }
});


module.exports.auth = (req, res, next) => {
    //req.session.user actually stores the user id
    if (req.session.user) {
        User.findById(req.session.user).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send("Unauthorized")
        })
    } else {
        res.status(401).send("Unauthorized")
    }
}

//start listening
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})