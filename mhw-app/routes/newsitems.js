const express = require('express')
const router = express.Router()
const { NewsItem } = require('../models/NewsItem')
const { ObjectID } = require('mongodb')
const security = require('../server')

//[GET] - Get an interval of news items
router.get('/getInterval', (req, res) =>  {
    let amnt = req.query.amnt ? parseInt(req.query.amnt, 10) : 0
    let skipAmnt = req.query.skip ? parseInt(req.query.skip, 10) : 10
    let left = 0

    if (amnt === undefined || skipAmnt === undefined) res.status(400).send()

    NewsItem.countDocuments((err, count) => {
        if (err) {res.status(500).send({errMsg: "An error occured on the server during the processing of the request."}); return}
        else left = count
    })

    NewsItem.find(null, {_id: false}).limit(amnt).skip(skipAmnt).sort({date: -1}).then((items) => {
        res.status(200).send({items: items, count: left})
    }).catch((error) => {
        res.status(500).send({errMsg: "An error occured on the server during the processing of the request."})
    })
})

router.delete('/delete/:id',  (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    if(req.params.id === undefined || req.params.id === null) res.status(400).send({errMsg: "An error occured on the server during the processing of the request."})

    let id = -1
    try{
        id = parseInt(req.params.id)
    }
    catch(err){
        res.status(400).send({errMsg: "An error occured on the server during the processing of the request."})
    }

    NewsItem.deleteOne({id: id}, (err) => {
        if(err) {res.status(500).send({errMsg: "An error occured on the server during the processing of the request."}); return}
        else res.status(200).send()
    })
})


router.patch('/update/:id', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    if(req.params.id === undefined || req.params.id === null) {res.status(400).send({errMsg: "An error occured"}); return}
    let id = -1
    try{
        id = parseInt(req.params.id)
    }
    catch(err){
        res.status(400).send({errMsg: "An error occured on the server during the processing of the request."})
        return
    }

    const updatedItem = {
        text: req.body.text
    }

    NewsItem.findOneAndUpdate({id: id}, updatedItem, {fields: {_id: false, __v: false}}, (err, doc) => {
        if (err) {res.status(500).send({errMsg: "An error occured on the server during the processing of the request."}); return}
        res.status(200).send(doc)
    })
})

router.post("/create", (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    let item = new NewsItem({
        text: req.body.text,
        date: Date.now(),
        id: req.body.id
    })
    item.save().then(resolve => {
        res.status(200).send()
    }, rej => {
        res.status(500).send({errMsg: "An error occured on the server during the processing of the request."})
    }).catch(err => {
        res.status(500).send({errMsg: "An error occured on the server during the processing of the request."})
    })
})

router.get('/index', (req, res) => {
    NewsItem.find({}, {id: true, _id: false}).sort({id: -1}).limit(1).then(doc => {
        res.status(200).send(doc)
    }, rej => {
        res.status(500).send({errMsg: "An error occured on the server during the processing of the request."})
    }).catch(err => {
        res.status(500).send({errMsg: "An error occured on the server during the processing of the request."})
    })
})

module.exports = router
