const express = require('express')
const router = express.Router()
const { ArmourPiece } = require('../models/ArmourPiece')
const { Weapon } = require('../models/Weapon')
const { ObjectID } = require('mongodb')

router.get('/armour/:name', (req, res) => {
    let passedName = req.params.name

    if(passedName === undefined || passedName === ""){
        res.status(400).send()
    }
    else{
        ArmourPiece.findOne({name: passedName}, {_id: false}, (err, doc) => {
            if(err) {res.status(500).send({errMsg: err}); return }
            else res.status(200).send(doc)
        })
    }
})

router.get('/weapon/:name', (req, res) => {
    let passedName = req.params.name

    if(passedName === undefined || passedName === ""){
        res.status(400).send()
    }
    else{
        Weapon.findOne({name: passedName}, {_id: false}, (err, doc) => {
            if(err) res.status(500).send({errMsg: "An error occured on the server during the processing of the request."})
            else res.status(200).send(doc)
        })
    }
})

module.exports = router
