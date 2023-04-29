import express from 'express'
import * as authController from '../controllers/authController.js'

const bookingRouter = express.Router()

bookingRouter
    .route('/reservation')
    .post(authController.protect, bookingController.createReservation)

bookingRouter
    .route('/checkout/bookings/:bookingID')
    .get(authController.protect, bookingController.getCheckoutSession)
