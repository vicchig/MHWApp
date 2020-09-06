const express = require('express')
const router = express.Router()
const { ArmourPiece } = require('../models/ArmourPiece')
const { Weapon } = require('../models/Weapon')
const { ObjectID } = require('mongodb')

router.get('/weapons/:name', (req, res) => {
    let passedName = req.params.name

    if(name === undefined || name === ""){
        res.status(400).send()
    }
    else{
        ArmourPiece.findOne({name: passedName}, {_id: false}, (err, res) => {
            if(err) res.status(500).send({errMsg: err})
            else res.status(200).send(res)
        })
    }
})

router.get('/armour/:name', (req, res) => {
    let passedName = req.params.name

    if(name === undefined || name === ""){
        res.status(400).send()
    }
    else{
        Weapon.findOne({name: passedName}, {_id: false}, (err, res) => {
            if(err) res.status(500).send({errMsg: err})
            else res.status(200).send(res)
        })
    }
})

module.exports = router
