import catchAsync from '../utils/catchAsync.js'
import APIFeatures from '../utils/apiFeatures.js'
import AppError from '../utils/appError.js'
import Movie from '../models/movieModel.js'
import * as factory from './handlerFactory.js'

const getAllMovies = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Movie.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
    const movies = await features.query

    res.status(200).json({
        status: 'success',
        results: movies.length,
        data: {
            movies,
        },
    })
})

const getMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findById(req.params.id)
    if (!movie) {
        return next(new AppError('No movie found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            movie,
        },
    })
})

const createMovie = factory.createOne(Movie)

const updateMovie = factory.updateOne(Movie)

const deleteMovie = factory.deleteOne(Movie)

export { getAllMovies, createMovie, deleteMovie, getMovie, updateMovie }
