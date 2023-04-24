import express from 'express'
import * as authController from '../controllers/authController.js'

const userRouter = express.Router()

userRouter.route('/signup').post(authController.signup)
userRouter.route('/login').post(authController.login)
userRouter.route('/logout').get(authController.logout)
userRouter.route('/forgotPassword').post(authController.forgotPassword)
userRouter.route('/resetPassword/:token').patch(authController.resetPassword)
userRouter
    .route('/updateMyPassword')
    .patch(authController.protect, authController.updatePassword)

export default userRouter
