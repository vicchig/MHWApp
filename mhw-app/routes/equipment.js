const express = require('express')
const router = express.Router()
const { EquipmentPiece } = require('../models/EquipmentPiece')
const { ObjectID } = require('mongodb')

router.get('/getEquipment/:name', (req, res) => {
    let passedName = req.params.name

    if(name === undefined || name === ""){
        res.status(400).send()
    }
    else{
        EquipmentPiece.findOne({name: passedName}, {_id: false}, (err, res) => {
            if(err) res.status(500).send({errMsg: err})
            else res.status(200).send(res)
        })
    }
})

module.exports = router
