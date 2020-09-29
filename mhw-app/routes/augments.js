const express = require('express')
const router = express.Router()
const { Augment } = require('../models/Augment')
const { ObjectID } = require('mongodb')
const fs = require('fs')


router.get("/", (req, res) => {
    if(!req.query.rarity || !req.query.augmentName || !req.query.level){
        res.status(400).send()
        return
    }

    const filter = {
        rarity: req.query.rarity,
        augment: req.query.augmentName,
        level: req.query.level
    }

    Augment.findOne(filter, {_id: false, __v: false, id: false, "materials._id": false}).then(doc => {
        res.status(200).send(doc)
    }).catch(rej => {
        res.status(500).send()
        return
    })
})

module.exports = router
