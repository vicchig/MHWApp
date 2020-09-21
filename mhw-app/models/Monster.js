'use strict';

const { ObjectID } = require('mongodb')
const mongoose = require('mongoose')


const MonsterSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
            unique: true
        },
        id: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            required: true,
            trim: true,
            minLength: 1
        },
        health: [
            {type: Number}
        ],
        species: {
            type: String,
            required: false,
            minLength: 1,
            default: ""
        },
        description: {
            type: String,
            required: false,
            default: ""
        },
        temperedRank: {
            type: Number,
            required: true,
            default: 0
        },
        difficulty: {
            type: Number,
            required: false,
            default: 0
        },
        weaknesses: [
            {
                element:  
                {
                    type: String,
                    required: true,
                    minLength: 1
                },
                stars: 
                {
                    type: Number,
                    required: true
                },
                condition:
                {
                    type: String,
                    required: false,
                    default: "None"
                }
            }
        ]  
        
    }
)

const Monster = mongoose.model('Monster', MonsterSchema)
module.exports = { Monster }