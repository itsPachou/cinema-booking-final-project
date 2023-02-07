'use strict'

import app from './app.js'
import dotenv from 'dotenv'
dotenv.config({ path: './config.env' })

const db = process.env.DATABASE
const pwd = process.env.DATABASE_PASSWORD
const DB = db.replace('<PASSWORD>', pwd)
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listing on port ${port}`)
})