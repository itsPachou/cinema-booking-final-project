import express from 'express'
import * as authController from '../controllers/authController.js'
import * as bookingsController from '../controllers/bookingsController.js'

const bookingRouter = express.Router({ mergeParams: true })

bookingRouter
    .route('/reservation')
    .post(
        authController.protect,
        bookingsController.setScreeningID,
        bookingsController.createReservation
    )

bookingRouter
    .route('/checkout/bookings/:bookingID')
    .get(authController.protect, bookingsController.getCheckoutSession)

export default bookingRouter
