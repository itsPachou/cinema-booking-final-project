import express from 'express'
import { fileURLToPath } from 'url'
import cookieParser from 'cookie-parser'
import rateLimit from 'express-rate-limit'
import helmet from 'helmet'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'

import viewRouter from './routers/viewRouter.js'
import AppError from './utils/appError.js'
import globalErrorHandler from './controllers/errorController.js'
import screeningRouter from './routers/screeningRouter.js'
import cinemaRouter from './routers/cinemaRouter.js'
import userRouter from './routers/userRouter.js'

const app = express()

// Global middleware
// set security http headers
app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false,
    })
)

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour.',
})
// rate limit on the api endpoints
app.use('/api', limiter)

// Set pug as the templating engine
app.set('view engine', 'pug')
app.set(new URL('views', import.meta.url))

app.use(express.json({ limit: '10kb' }))
// sanitize the data against NoSQL query injection
app.use(mongoSanitize())
// sanitize the data against XSS
app.use(xss())

app.use(cookieParser())

app.use(express.static(fileURLToPath(new URL('./public', import.meta.url))))

app.use('/api/v1/screenings', screeningRouter)
app.use('/api/v1/cinemas', cinemaRouter)
app.use('/api/v1/users', userRouter)
app.use('/', viewRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404))
})
app.use(globalErrorHandler)

export default app
