import express from 'express'
import * as cinemasController from '../controllers/cinemasController.js'
import * as authController from '../controllers/authController.js'

const cinemaRouter = express.Router()

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
