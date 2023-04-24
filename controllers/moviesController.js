import catchAsync from '../utils/catchAsync.js'
import APIFeatures from '../utils/apiFeatures.js'
import AppError from '../utils/appError.js'
import Movie from '../models/movieModel.js'

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

const createMovie = catchAsync(async (req, res, next) => {
    const newMovie = await Movie.create(req.body)

    res.status(201).json({
        status: 'success',
        data: {
            movie: newMovie,
        },
    })
})

const updateMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })

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

const deleteMovie = catchAsync(async (req, res, next) => {
    const movie = await Movie.findByIdAndDelete(req.params.id)

    if (!movie) {
        return next(new AppError('No movie found with that ID', 404))
    }

    res.status(204).json({
        status: 'success',
        data: null,
    })
})

export { getAllMovies, createMovie, deleteMovie, getMovie, updateMovie }
