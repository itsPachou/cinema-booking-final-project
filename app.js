import express from 'express'
import { fileURLToPath } from 'url'
import viewRouter from './routers/viewRouter.js'
import AppError from './utils/appError.js'
import globalErrorHandler from './controllers/errorController.js'
import screeningRouter from './routers/screeningRouter.js'
import cinemaRouter from './routers/cinemaRouter.js'

const app = express()

// Set pug as the templating engine
app.set('view engine', 'pug')
app.set(new URL('views', import.meta.url))

app.use(express.static(fileURLToPath(new URL('./public', import.meta.url))))

app.use('/api/v1/screenings', screeningRouter)
app.use('/api/v1/cinemas', cinemaRouter)
app.use('/', viewRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

export default app
