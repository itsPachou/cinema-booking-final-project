import * as util from 'node:util'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const signToken = (id) =>
    jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })

async function signup(req, res) {
    const newUser = await User.create({
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
    })

    res.status(201).json({
        status: 'success',
        data: {
            user: newUser,
        },
    })
}

async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        // const err = Error('Please provide username and password.')
        // err.status(400)
        // err.statusText = 'Bad request.'
        // return Promise.reject(err)
        res.sendStatus(400)
        return
    }

    try {
        const user = await User.findOne({ email }).select('+password')
        if (!user || !(await user.validatePassword(password, user.password))) {
            // const err = Error('Incorrect username or password.')
            // err.status(401)
            // err.statusText = 'Unauthorized'
            // return Promise.reject(err)
            return res.sendStatus(401)
        }
        const token = signToken(user._id)

        const cookieOptions = {
            expires: new Date(
                Date.now() +
                    process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
            ), // setting cookie expiration to 30 days in miliseconds
            httpOnly: true, // make it so the browser can only get, store, and send back the cookie
        }
        if (process.env.NODE_ENV === 'production') cookieOptions.secure = true // only send cookie over HTTPS (only relevant once we go to production)
        res.cookie('jwt', token, cookieOptions)
        res.status(200).json({
            status: 'success',
            token,
        })
    } catch (error) {
        res.sendStatus(500)
    }
}

export { signup, login }
