import Screening from '../models/screeningModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'

const getAllScreenings = catchAsync(async (req, res, next) => {
    const queryObj = { ...req.query }
    const excludedFields = ['sort', 'limit', 'fields']
    excludedFields.forEach((el) => delete queryObj[el])
    const query = await Screening.find(queryObj)
    const screenings = await query

    res.status(200).json({
        status: 'success',
        results: screenings.length,
        data: {
            screenings,
        },
    })
})

const getScreening = catchAsync(async (req, res, next) => {
    const screening = await Screening.findById(req.params.id)
    if (!screening) {
        return next(new AppError('No screening found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            screening,
        },
    })
})

const createScreening = catchAsync(async (req, res, next) => {
    const newScreening = await Screening.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            screening: newScreening,
        },
    })
})

const updateScreening = catchAsync(async (req, res, next) => {
    const screening = await Screening.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    )

    res.status(200).json({
        status: 'success',
        data: {
            screening,
        },
    })
})

const deleteScreening = catchAsync(async (req, res, next) => {
    await Screening.findByIdAndDelete(req.params.id)

    res.status(204).json({
        status: 'success',
        data: null,
    })
})

export {
    getAllScreenings,
    getScreening,
    createScreening,
    updateScreening,
    deleteScreening,
}
