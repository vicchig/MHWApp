'use strict';

const { ObjectID } = require('mongodb')
const mongoose = require('mongoose')


const ArmourPieceSchema = new mongoose.Schema(
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
            minLength: 3
        },
        rarity: {
            type: Number,
            required: true
        },
        crafting: {
            materials: [
                {
                    quantity: {
                        type: Number,
                        required: true,
                        default: 0
                    },
                    name: {
                        type: String,
                        required: true,
                        minLength: 1
                    },
                    description: {
                        type: String,
                        required: true,
                        minLength: 0
                    }
                }
            ]
        }
    }
)

const ArmourPiece = mongoose.model('ArmourPiece', ArmourPieceSchema)
module.exports = { ArmourPiece }