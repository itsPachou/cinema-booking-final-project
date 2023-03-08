/* eslint-disable no-console */
/* eslint-disable import/first */
import dotenv from 'dotenv'

dotenv.config({ path: './config.env' })
import mongoose from 'mongoose'
import { setDefaultResultOrder } from 'dns'
import app from './app.js'

setDefaultResultOrder('ipv4first')

let DB
if (process.env.USE_LOCAL_DATABASE) {
    DB = process.env.DATABASE_LOCAL
    console.log('Using local DB...')
} else {
    const db = process.env.DATABASE
    const pwd = process.env.DATABASE_PASSWORD
    DB = db.replace('<PASSWORD>', pwd)
}

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connected.')
    })

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})

process.on('unhandledRejection', (err) => {
    console.log('Unhandled rejection occured. Shutting down...')
    console.log(err.name, err.message)
    server.close(() => {
        process.exit(1)
    })
})
