import express from 'express'
import * as cinemasController from '../controllers/cinemasController.js'
import * as authController from '../controllers/authController.js'
import movieRouter from './movieRouter.js'

const cinemaRouter = express.Router()

cinemaRouter.use('/:cinemaID/movies', movieRouter)
cinemaRouter.use('/:cinemaID/rooms', movieRouter)

cinemaRouter
    .route('/')
    .get(cinemasController.getAllCinemas)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        cinemasController.createCinema
    )

cinemaRouter
    .route('/:id')
    .get(cinemasController.getCinema)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        cinemasController.deleteCinema
    )
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        cinemasController.updateCinema
    )

export default cinemaRouter
