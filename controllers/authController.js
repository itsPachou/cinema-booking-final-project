import * as util from 'node:util'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import AppError from '../utils/appError.js'
import catchAsync from '../utils/catchAsync.js'
import sendEmail from '../utils/email.js'

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })

const signup = catchAsync(async (req, res, next) => {
    const newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
    })

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ), // setting cookie expiration to 30 days in miliseconds
        httpOnly: true, // make it so the browser can only get, store, and send back the cookie
    }
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true // only send cookie over HTTPS (only relevant once we go to production)
    res.cookie('jwt', token, cookieOptions)

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser,
        },
    })
})

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new AppError('Missing email or password.', 400))
    }

    const user = await User.findOne({ email }).select('+password')
    if (!user || !(await user.validatePassword(password, user.password))) {
        return next(new AppError('Incorrect email or password.', 401))
    }
    const token = signToken(user._id)

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
        ), // setting cookie expiration to 30 days in miliseconds
        httpOnly: true, // make it so the browser can only get, store, and send back the cookie
    }
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true // only send cookie over HTTPS (only relevant once we go to production)
    res.cookie('jwt', token, cookieOptions)
    res.status(200).json({
        status: 'success',
        token,
    })
})

const logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true,
    })
    res.status(200).json({
        status: 'success',
    })
}

const protect = catchAsync(async (req, res, next) => {
    let token
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1]
    } else if (req.cookies.jwt) {
        token = req.cookies.jwt
    }
    if (!token) {
        return next(new AppError('Unauthorized to access this route', 401))
    }

    const decoded = await util.promisify(jwt.verify)(
        token,
        process.env.JWT_SECRET
    )
    const freshUser = await User.findById(decoded.id)
    if (!freshUser) {
        return res.redirect('/')
    }
    if (freshUser.changedPasswordAfter(decoded.iat)) {
        return res.redirect('/')
    }
    req.user = freshUser

    next()
})

const isLoggedIn = async (req, res, next) => {
    try {
        if (req.cookies.jwt) {
            const decoded = await util.promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            )
            const freshUser = await User.findById(decoded.id)
            if (!freshUser) {
                return next()
            }
            if (freshUser.changedPasswordAfter(decoded.iat)) {
                return next()
            }

            res.locals.user = freshUser
            return next()
        }
    } catch (error) {
        return next()
    }
    next()
}

const restrictTo =
    (...roles) =>
    (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            next(
                new AppError(
                    'You do not have permission to perform this action',
                    403
                )
            )
        }
        next()
    }

const forgotPassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return next(
            new AppError('No user with the specified email address', 404)
        )
    }

    const resetToken = user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })

    const resetURL = `${req.protocol}://${req.get(
        'host'
    )}/api/v1/users/resetPassword/${resetToken}`

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Your password reset token (valid for 10 min)',
            message,
        })

        res.status(200).json({
            status: 'success',
            message: 'Token sent to email.',
        })
    } catch (error) {
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({ validateBeforeSave: false })

        return next(
            new AppError(
                'An error occured while sending the email. Try again later!',
                500
            )
        )
    }
})

const resetPassword = catchAsync(async (req, res, next) => {})

export {
    signup,
    login,
    logout,
    protect,
    restrictTo,
    isLoggedIn,
    forgotPassword,
    resetPassword,
}
