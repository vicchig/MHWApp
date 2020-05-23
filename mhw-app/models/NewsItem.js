'use strict';

const { ObjectID } = require('mongodb')
const mongoose = require('mongoose')


const NewsItemSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true,
            minLength: 1,
        },
        date: {
            type: Date,
            required: true,
        }
    }
)

const NewsItem = mongoose.model('NewsItem', NewsItemSchema)
module.exports = { NewsItem }