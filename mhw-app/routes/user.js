const express = require('express')
const router = express.Router()
const { User } = require('../models/User')
const { ObjectID } = require('mongodb')

router.get('/findUserByID/:id', (req, res) => {
    let id = req.params.id
    if(id === null || id === undefined){
        res.status(400).send()
    }
    
    User.findOne({id: id}, {_id: false, password: false, __v: false}, (err, doc) => {
        if(err){
            res.status(500).send({errMsg: err})
            return
        }

        res.status(200).send({currentUser: doc})
    })
})

module.exports = router
