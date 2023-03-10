/* eslint-disable no-console */
import * as fs from 'node:fs'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import User from '../models/userModel.js'
import Movie from '../models/cinemaModel.js'
import Cinema from '../models/movieModel.js'

dotenv.config({ path: './config.env' })

let DB
if (process.env.USE_LOCAL_DATABASE) {
    DB = process.env.DATABASE_LOCAL
    console.log('Using local DB...')
} else {
    const db = process.env.DATABASE
    const pwd = process.env.DATABASE_PASSWORD
    DB = db.replace('<PASSWORD>', pwd)
}

mongoose.connect(DB).then(() => {
    console.log('DB connected.')
})

const users = JSON.parse(
    fs.readFileSync(new URL('./users.json', import.meta.url), 'utf-8')
)
const movies = JSON.parse(
    fs.readFileSync(new URL('./movies.json', import.meta.url), 'utf-8')
)
const cinemas = JSON.parse(
    fs.readFileSync(new URL('./cinemas.json', import.meta.url), 'utf-8')
)

const importData = async () => {
    try {
        await User.create(users)
        await Movie.create(movies)
        await Cinema.create(cinemas)
        console.log('Data imported.')
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

const deleteData = async () => {
    try {
        await User.deleteMany()
        await Movie.deleteMany()
        await Cinema.deleteMany()
        console.log('Data deleted.')
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}
