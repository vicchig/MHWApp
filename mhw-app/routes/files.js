const express = require('express')
const router = express.Router()
let fs=require('fs');


router.get('/decoNames', (req, res) => {
    let fileContents 
    try{
       fileContents = fs.readFileSync('./src/Data/decorationNames.json', 'utf8');
    }catch(err){
        res.status(500).send({errMsg: err})
        return
    }

    let parsedFileContents = JSON.parse(fileContents);
    res.status(200).send(parsedFileContents)
})

router.get('/skillNames', (req, res) => {
    let fileContents 
    try{
       fileContents = fs.readFileSync('./src/Data/skillNames.json', 'utf8');
    }catch(err){
        res.status(500).send({errMsg: err})
        return
    }

    let parsedFileContents = JSON.parse(fileContents);
    res.status(200).send(parsedFileContents)
})

router.get('/equipmentNames', (req, res) => {
    let fileContents 
    try{
       fileContents = fs.readFileSync('./src/Data/equipmentNames.json', 'utf8');
    }catch(err){
        res.status(500).send({errMsg: err})
        return
    }

    let parsedFileContents = JSON.parse(fileContents);
    res.status(200).send(parsedFileContents)
})


module.exports = router
