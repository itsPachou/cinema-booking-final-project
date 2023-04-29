import Screening from '../models/screeningModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import * as factory from './handlerFactory.js'

const getAllScreenings = catchAsync(async (req, res, next) => {
    const queryObj = { ...req.query }
    const excludedFields = ['sort', 'limit', 'fields', 'page']
    excludedFields.forEach((el) => delete queryObj[el])
    if (req.params.cinemaID) queryObj.cinemaID = req.params.cinemaID
    if (req.params.roomID) queryObj.screeningRoomID = req.params.roomID
    if (req.params.movieID) queryObj.movieID = req.params.movieID
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

const setCinemaMovieRoomId = (req, res, next) => {
    if (!req.body.cinemaID) req.body.cinemaID = req.params.cinemaID
    if (!req.body.movieID) req.body.movieID = req.params.movieID
    if (!req.body.screeningRoomID) req.body.screeningRoomID = req.params.roomID
    next()
}

const createScreening = factory.createOne(Screening)

const updateScreening = factory.updateOne(Screening)

const deleteScreening = factory.deleteOne(Screening)

export {
    getAllScreenings,
    getScreening,
    createScreening,
    updateScreening,
    deleteScreening,
    setCinemaMovieRoomId,
}
