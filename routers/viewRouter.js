import express from 'express'
import catchAsync from '../utils/catchAsync.js'
import Cinema from '../models/cinemaModel.js'

const viewRouter = express.Router()

viewRouter.route('/').get((req, res) => {
    res.redirect(308, '/home')
})
viewRouter.route('/home').get(
    catchAsync(async (req, res, next) => {
        const cinemas = await Cinema.find()
        res.set(
            'Content-Security-Policy',
            "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
        )
        res.status(200).render('home', {
            cinemas,
        })
    })
)
viewRouter.route('/screenings').get(
    catchAsync(async (req, res, next) => {
        // const cinemas = await Cinema.find()
        res.set(
            'Content-Security-Policy',
            "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
        )
        res.status(200).render('screenings', {
            // cinemas,
        })
    })
)

export default viewRouter
