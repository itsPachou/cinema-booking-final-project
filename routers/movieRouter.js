import express from 'express'
import * as moviesController from '../controllers/moviesController.js'
import * as authController from '../controllers/authController.js'
import screeningRouter from './screeningRouter.js'

const movieRouter = express.Router({ mergeParams: true })

movieRouter.use('/:movieID/screenings', screeningRouter)

movieRouter
    .route('/')
    .get(moviesController.getAllMovies)
    .post(
        authController.protect,
        authController.restrictTo('employee', 'admin'),
        moviesController.createMovie
    )

movieRouter
    .route('/:id')
    .get(moviesController.getMovie)
    .delete(
        authController.protect,
        authController.restrictTo('employee', 'admin'),
        moviesController.deleteMovie
    )
    .patch(
        authController.protect,
        authController.restrictTo('employee', 'admin'),
        moviesController.updateMovie
    )

export default movieRouter
