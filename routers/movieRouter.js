import express from 'express'
import * as moviesController from '../controllers/moviesController.js'
import * as authController from '../controllers/authController.js'

const movieRouter = express.Router()

movieRouter
    .route('/')
    .get(moviesController.getAllMovies)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        moviesController.createMovie
    )

movieRouter
    .route('/:id')
    .get(moviesController.getMovie)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        moviesController.deleteMovie
    )
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        moviesController.updateMovie
    )

export default movieRouter
