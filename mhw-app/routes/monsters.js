const express = require('express')
const router = express.Router()
const { Monster } = require('../models/Monster')

router.get("/", (req, res) => {
    const proj = JSON.parse(req.query.p)
    const query = JSON.parse(req.query.q)
    if(!query || !proj || Object.keys(proj).length === 0 || Object.keys(query).length === 0 ){
        res.status(400).send()
        return
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