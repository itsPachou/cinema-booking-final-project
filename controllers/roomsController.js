import Room from '../models/roomModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import APIFeatures from '../utils/apiFeatures.js'

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

const createRoom = catchAsync(async (req, res, next) => {
    if (!req.body.cinemaID) req.body.cinemaID = req.params.cinemaID

    const newRoom = await Room.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            room: newRoom,
        },
    })
})

const updateRoom = catchAsync(async (req, res, next) => {
    const room = await Room.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

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

const deleteRoom = catchAsync(async (req, res, next) => {
    const room = await Room.findByIdAndDelete(req.params.id)

    if (!room) {
        return next(new AppError('No room found with that ID', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null,
    })
})

export { getAllRooms, createRoom, deleteRoom, getRoom, updateRoom }
