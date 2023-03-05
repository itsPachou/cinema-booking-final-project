import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from './app.js'

dotenv.config({ path: './config.env' })

const db = process.env.DATABASE
const pwd = process.env.DATABASE_PASSWORD
const DB = db.replace('<PASSWORD>', pwd)

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connected.')
    })

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Listing on port ${port}`)
})
