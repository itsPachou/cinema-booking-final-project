import express from 'express'
import * as cinemasController from './controllers/cinemasController'
import * as screeningsController from './controllers/screeningsController'

const v1Router = express.Router()

v1Router
    .route('/cinemas')
    .get(cinemasController.getAllCinemas)
    .post(cinemasController.createCinema)
v1Router.route('/screenings').get(screeningsController.getAllScreenings)

export default v1Router
