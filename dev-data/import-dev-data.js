/* eslint-disable no-console */
import * as fs from 'node:fs'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { setDefaultResultOrder } from 'dns'
import User from '../models/userModel.js'
import Cinema from '../models/cinemaModel.js'
import Movie from '../models/movieModel.js'
import Room from '../models/roomModel.js'

setDefaultResultOrder('ipv4first')
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

const { users } = JSON.parse(
    fs.readFileSync(new URL('./users.json', import.meta.url), 'utf-8')
)
// console.log(users)
const { movies } = JSON.parse(
    fs.readFileSync(new URL('./movies.json', import.meta.url), 'utf-8')
)
// console.log(movies)

const { cinemas } = JSON.parse(
    fs.readFileSync(new URL('./cinemas.json', import.meta.url), 'utf-8')
)
// console.log(cinemas)

const { rooms } = JSON.parse(
    fs.readFileSync(new URL('./rooms.json', import.meta.url), 'utf-8')
)
// console.log(rooms)

const populateSeatPositionsInRooms = () => {
    rooms.forEach((el) => {
        const { width } = el.dimensions
        const { length } = el.dimensions
        for (let i = 0; i < length; i += 1) {
            for (let j = 0; j < width; j += 1) {
                el.seatPositions.push({ row: i, col: j })
            }
        }
    })
}

const populateRoomsWithCinemas = async () => {
    const cinema = await Cinema.find({
        locationName: 'The Lumiere - Manchester',
    }).exec()
    rooms.forEach((element) => {
        element.cinemaID = cinema[0]._id
    })
}

const importData = async () => {
    try {
        await User.create(users)
        await Movie.create(movies)
        await Cinema.create(cinemas)
        await populateRoomsWithCinemas()
        populateSeatPositionsInRooms()
        await Room.create(rooms)
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
        await Room.deleteMany()
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
