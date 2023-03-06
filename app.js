import express from 'express'
import { fileURLToPath } from 'url'
import v1Router from './v1Router.js'
import viewRouter from './viewRouter.js'
import AppError from './utils/appError.js'
import globalErrorHandler from './controllers/errorController.js'

const app = express()

// Set pug as the templating engine
app.set('view engine', 'pug')
app.set(new URL('views', import.meta.url))

app.use(express.static(fileURLToPath(new URL('./public', import.meta.url))))

app.use('/api/v1', v1Router)
app.use('/', viewRouter)

app.all('*', (req, res, next) => {
    next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404))
})

app.use(globalErrorHandler)

export default app
