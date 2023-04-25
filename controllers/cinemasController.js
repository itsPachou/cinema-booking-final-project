import Cinema from '../models/cinemaModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import APIFeatures from '../utils/apiFeatures.js'
import * as factory from './handlerFactory.js'

const getAllCinemas = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Cinema.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const cinemas = await features.query

    res.status(200).json({
        status: 'success',
        results: cinemas.length,
        data: {
            cinemas,
        },
    })
})

const getCinema = catchAsync(async (req, res, next) => {
    const cinema = await Cinema.findById(req.params.id)
    if (!cinema) {
        return next(new AppError('No cinema found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            cinema,
        },
    })
})

const createCinema = catchAsync(async (req, res, next) => {
    const newCinema = await Cinema.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            cinema: newCinema,
        },
    })
})

const updateCinema = factory.updateOne(Cinema)

const deleteCinema = factory.deleteOne(Cinema)

export { getAllCinemas, createCinema, deleteCinema, getCinema, updateCinema }
