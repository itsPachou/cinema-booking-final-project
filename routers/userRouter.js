import express from 'express'
import * as authController from '../controllers/authController.js'
import * as usersController from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.route('/signup').post(authController.signup)
userRouter.route('/login').post(authController.login)
userRouter.route('/logout').get(authController.logout)
userRouter.route('/forgotPassword').post(authController.forgotPassword)
userRouter.route('/resetPassword/:token').patch(authController.resetPassword)

userRouter
    .route('/updateMyPassword')
    .patch(authController.protect, authController.updatePassword)

userRouter
    .route('/updateMe')
    .patch(authController.protect, usersController.updateMe)

userRouter
    .route('/')
    .get(usersController.getAllUsers)
    .post(
        authController.protect,
        authController.restrictTo('admin'),
        usersController.createUser
    )

userRouter
    .route('/:id')
    .get(usersController.getUser)
    .delete(
        authController.protect,
        authController.restrictTo('admin'),
        usersController.deleteUser
    )
    .patch(
        authController.protect,
        authController.restrictTo('admin'),
        usersController.updateUser
    )

export default userRouter
