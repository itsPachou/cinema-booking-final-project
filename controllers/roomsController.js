import Room from '../models/roomModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import APIFeatures from '../utils/apiFeatures.js'
import * as factory from './handlerFactory.js'

const getAllRooms = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Room.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const rooms = await features.query

    res.status(200).json({
        status: 'success',
        results: rooms.length,
        data: {
            rooms,
        },
    })
})

const getRoom = catchAsync(async (req, res, next) => {
    const room = await Room.findById(req.params.id)
    if (!room) {
        return next(new AppError('No room found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            room,
        },
    })
})

const setCinemaId = (req, res, next) => {
    if (!req.body.cinemaID) req.body.cinemaID = req.params.cinemaID
    next()
}

const createRoom = factory.creatOne(Room)

const updateRoom = factory.updateOne(Room)

const deleteRoom = factory.deleteOne(Room)

export { getAllRooms, createRoom, deleteRoom, getRoom, updateRoom, setCinemaId }
