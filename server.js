'use strict'

import app from './app.js'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({ path: './config.env' })

const db = process.env.DATABASE
const pwd = process.env.DATABASE_PASSWORD
const DB = db.replace('<PASSWORD>', pwd)

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('DB connected.')
    })

const cinemaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A cinema must have a name'],
        unique: true
    },
    postcode: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
})
const Cinema = mongoose.model('Cinema', cinemaSchema)

const testCinema = new Cinema({
    name: 'Leicester High Street',
    postcode: 'LE1 1TS',
    address: 'The High Cross, 1 High St'
})

testCinema.save().then(doc => {
    console.log(doc)
}).catch(err => {
    console.log(err)
})

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listing on port ${port}`)
})