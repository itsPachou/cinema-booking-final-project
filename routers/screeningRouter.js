import express from 'express'
import * as screeningsController from '../controllers/screeningsController.js'

const screeningRouter = express.Router()

screeningRouter
    .route('/')
    .get(screeningsController.getAllScreenings)
    .post(screeningsController.createScreening)

screeningRouter
    .route('/:id')
    .get(screeningsController.getScreening)
    .patch(screeningsController.updateScreening)
    .delete(screeningsController.deleteScreening)

export default screeningRouter
