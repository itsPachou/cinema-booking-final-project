import express from 'express'
import * as cinemasController from '../controllers/cinemasController.js'

const cinemaRouter = express.Router()

cinemaRouter
    .route('/')
    .get(cinemasController.getAllCinemas)
    .post(cinemasController.createCinema)

cinemaRouter
    .route('/:id')
    .get(cinemasController.getCinema)
    .delete(cinemasController.deleteCinema)
    .patch(cinemasController.updateCinema)

export default cinemaRouter
