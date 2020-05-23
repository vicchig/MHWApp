const express = require('express')
const router = express.Router()
const { NewsItem } = require('../models/NewsItem')
const { ObjectID } = require('mongodb')


//[GET] - Get all newsitems
router.get('/getAll', (req, res, next) =>  {

    NewsItem.find().then((items) => {
        res.status(200).send(items)
    }).catch((error) => {
        console.log("Failed endpoint: /newsitem/getAll\n" + error)
        res.status(500).send()
    })
    
})




module.exports = router
