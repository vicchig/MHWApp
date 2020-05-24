const express = require('express')
const router = express.Router()
const { NewsItem } = require('../models/NewsItem')
const { ObjectID } = require('mongodb')


//[GET] - Get an interval of news items
router.get('/getInterval', (req, res) =>  {
    let amnt = req.query.amnt ? parseInt(req.query.amnt, 10) : 0
    let skipAmnt = req.query.skip ? parseInt(req.query.skip, 10) : 10
    let left = 0

    NewsItem.countDocuments((err, count) => {
        if (err) console.log(err)
        else left = count
    })

    NewsItem.find().limit(amnt).skip(skipAmnt).then((items) => {
        res.status(200).send({"items": items, "count": left})
    }).catch((error) => {
        console.log("Failed endpoint: /newsitem/getInterval\n" + error)
        res.status(500).send()
    })
})




module.exports = router
