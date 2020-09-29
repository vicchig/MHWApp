const express = require('express')
const router = express.Router()
const { Augment } = require('../models/Augment')
const { ObjectID } = require('mongodb')
const fs = require('fs')


router.get("/", (req, res) => {
    if(!req.body.rarity || !req.body.augmentName || !req.body.level){
        res.status(400).send()
        return
    }

    const filter = {
        rarity: req.body.rarity,
        augment: req.body.augmentName,
        level: req.body.level
    }

    Augment.findOne(filter, {_id: false, __v: false, id: false, "materials._id": false}).then(doc => {
        res.status(200).send(doc)
    }).catch(rej => {
        res.status(500).send()
        return
    })
})

module.exports = router
