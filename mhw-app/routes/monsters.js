const express = require('express')
const router = express.Router()
const { Monster } = require('../models/Monster')

router.get("/", (req, res) => {
    let proj = req.query.p ? JSON.parse(req.query.p) : null
    let query = req.query.q ? JSON.parse(req.query.q) : null

    if(!proj || Object.keys(proj).length === 0){
        proj = {}
    }
    if(!query){
        query = {}
    }

    if(proj._id === undefined){
        proj._id = 0
    }
    if(proj.__v === undefined){
        proj.__v = 0
    }
    if(proj.weaknesses === undefined || (proj.weaknesses && proj.weaknesses._id === undefined)){
        proj["weaknesses._id"] = 0
    }

    Monster.find(query, proj, (err, doc) => {
        if(err){
            console.log(err)
            res.status(500).send()
            return
        }

        res.status(200).send(doc)
    })
})

module.exports = router