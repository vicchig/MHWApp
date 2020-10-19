'use strict'
const log = console.log

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser') 
const cors = require('cors')
const app = express()
const csp = require(`helmet`)

/*
app.use(csp.contentSecurityPolicy({
    directives: {
        defaultSrc: ['\'self\''],
        scriptSrc: ['\'self\''],
        objectSrc: ['\'self\''],
        imgSrc: ['\'self\'', 'mhw-db.com'],
        fontSrc: ['\'self\''],
        mediaSrc: ['\'self\''],
        upgradeInsecureRequests: []
    },
    reportOnly: false
}))*/



//session cookie
app.use(session({
    secret: ''+process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3000,
        httpOnly: true,
        sameSite: true
    }
}));

const newsitemRoutes = require('./routes/newsitems')
const userRoutes = require('./routes/user')
const dataRoutes = require('./routes/files')
const equipmentRoutes = require('./routes/equipment')
const monsterRoutes = require('./routes/monsters')
const augmentRoutes = require('./routes/augments')

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
app.use('/newsitem', newsitemRoutes)
app.use('/users', userRoutes)
app.use('/data', dataRoutes)
app.use('/equipment', equipmentRoutes)
app.use('/monsters', monsterRoutes)
app.use('/augments', augmentRoutes)


// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
mongoose.set('useFindAndModify', false); // for some deprecation issues


const { User } = require('./models/User')


//POST - Log In
app.post('/log_in', (req, res) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(400).json({ message: 'Missing Authorization Header' });
    }

    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    // Use the static method on the User model to find a user
    // by their username and password
	User.findByUsernamePassword(username, password).then((user) => {
	    if (!user) {
            res.status(404).send();
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user.id;
            res.status(200).send({user: user});
        }
    }).catch((error) => {
        console.error(error)
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
            res.status(200).send()
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


app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' default-src 'none' object-src 'self' script-src 'self' img-src 'self' font-src 'self' media-src 'self' upgradeInsecureRequests");
    return next();
});


module.exports.auth = (req, res, next) => {
    //req.session.user actually stores the user id
    if (req.session.user) {
        User.findOne({id: req.session.user}, {_id: false, password: false}).then((user) => {
            if (!user) {
                return Promise.reject()
            } else {
                req.user = user
                next()
            }
        }).catch((error) => {
            res.status(401).send({errMsg: "Unauthorized"})
        })
    } else {
        res.status(401).send({errMsg: "Unauthorized"})
    }
}

//start listening
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
})