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

    if (amnt == undefined || skipAmnt == undefined) res.status(400).send()

    NewsItem.countDocuments((err, count) => {
        if (err) res.status(500).send({errMsg: err})
        else left = count
    })

    NewsItem.find(null, {_id: false}).limit(amnt).skip(skipAmnt).then((items) => {
        res.status(200).send({items: items, count: left})
    }).catch((error) => {
        res.status(500).send({errMsg: error})
    })
})

router.delete('/delete/:id',  (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    if(req.params.id === undefined || req.params.id === null) res.status(400).send({errMsg: "ID was not of a valid type."})

    let id = -1
    try{
        id = parseInt(req.params.id)
    }
    catch(err){
        res.status(400).send({errMsg: err})
    }

    NewsItem.deleteOne({id: id}, (err) => {
        if(err) res.status(500).send({errMsg: err})
        else res.status(200).send()
    })
})


router.patch('/update/:id', (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    if(req.params.id === undefined || req.params.id === null) {res.status(400).send({errMsg: "ID was not of a valid type."}); return}
    let id = -1
    try{
        id = parseInt(req.params.id)
    }
    catch(err){
        res.status(400).send({errMsg: "ID was not of a valid type. \n" + err})
        return
    }

    const updatedItem = {
        text: req.body.text
    }

    NewsItem.findOneAndUpdate({id: id}, updatedItem, {fields: {_id: false, __v: false}}, (err, doc) => {
        if (err) {res.status(500).send({errMsg: "An error occured while attempting to update document. \n" + err}); return}
        res.status(200).send(doc)
    })
})

router.post("/create", (req, res, next) => {security.auth(req, res, next)}, (req, res) => {
    console.log(req.body)
    let item = new NewsItem({
        text: req.body.text,
        date: Date.now(),
        id: req.body.id
    })
    item.save().then(resolve => {
        res.status(200).send()
    }, rej => {
        res.status(500).send({errMsg: "An error occurred. \n" + rej})
    }).catch(err => {
        res.status(500).send({errMsg: "An error occurred. \n" + err})
    })
})

router.get('/index', (req, res) => {
    NewsItem.find({}, {id: true, _id: false}).sort({id: -1}).limit(1).then(doc => {
        res.status(200).send(doc)
    }, rej => {
        res.status(500).send({errMsg: "An error occurred. \n " + rej})
    }).catch(err => {
        res.status(500).send({errMsg: "An error occurred. \n" + err})
    })
})

module.exports = router
