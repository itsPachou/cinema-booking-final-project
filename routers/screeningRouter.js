import express from 'express'
import * as screeningsController from '../controllers/screeningsController.js'
import * as authController from '../controllers/authController.js'

const screeningRouter = express.Router()

screeningRouter
    .route('/')
    .get(screeningsController.getAllScreenings)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        screeningsController.createScreening
    )

screeningRouter
    .route('/:id')
    .get(screeningsController.getScreening)
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        screeningsController.updateScreening
    )
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        screeningsController.deleteScreening
    )

export default screeningRouter
