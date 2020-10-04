'use strict';

const { ObjectID } = require('mongodb')
const mongoose = require('mongoose')


const AugmentSchema = new mongoose.Schema(
    {
        rarity: {
            type: Number,
            required: true,
            default: 0
        },
        augment: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
        },
        level: {
            type: Number,
            required: true,
            default: 0
        },
        id: {
            type: Number,
            required: true
        },
        materials: [
            {
                name: {
                    type: String,
                    required: true,
                    minLength: 1,
                    default: "Missing Name"
                },
                description: {
                    type: String,
                    required: true,
                    default: "Missing Description"
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: -1
                }
            }
        ]  
        
    }
)

const Augment = mongoose.model('Augment', AugmentSchema)
module.exports = { Augment }