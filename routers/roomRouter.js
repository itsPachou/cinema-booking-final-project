import express from 'express'
import * as roomsController from '../controllers/roomsController.js'
import * as authController from '../controllers/authController.js'
import movieRouter from './movieRouter.js'

const roomRouter = express.Router({ mergeParams: true })

roomRouter.use('/:roomID/movies', movieRouter)

roomRouter
    .route('/')
    .get(roomsController.getAllRooms)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        roomsController.setCinemaId,
        roomsController.createRoom
    )

roomRouter
    .route('/:id')
    .get(roomsController.getRoom)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        roomsController.deleteRoom
    )
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        roomsController.updateRoom
    )

export default roomRouter
