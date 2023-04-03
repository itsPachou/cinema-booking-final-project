import Cinema from '../models/cinemaModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'

const getAllCinemas = catchAsync(async (req, res, next) => {
    const queryObj = { ...req.query }
    const excludedFields = ['sort', 'limit', 'fields', 'page']
    excludedFields.forEach((el) => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)

    let query = Cinema.find(JSON.parse(queryStr))

    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }
    if (req.query.fields) {
        const fields = req.query.fields.split(',').joing(' ')
        query = query.select(fields)
    } else {
        query = query.select('-__v')
    }

    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 100
    const skip = (page - 1) * limit
    query = query.skip(skip).limit(limit)

    if (req.query.page) {
        const numCinemas = await Cinema.countDocuments()
        if (skip >= numCinemas)
            next(new AppError('This page does not exist', 400))
    }

    const cinemas = await query

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

const updateCinema = catchAsync(async (req, res, next) => {
    const cinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

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

const deleteCinema = catchAsync(async (req, res, next) => {
    const cinema = await Cinema.findByIdAndDelete(req.params.id)

    if (!cinema) {
        return next(new AppError('No cinema found with that ID', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null,
    })
})

export { getAllCinemas, createCinema, deleteCinema, getCinema, updateCinema }
