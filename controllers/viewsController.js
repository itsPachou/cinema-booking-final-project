import catchAsync from '../utils/catchAsync.js'
import Cinema from '../models/cinemaModel.js'
import Screening from '../models/screeningModel.js'

const getHomePage = catchAsync(async (req, res, next) => {
    const cinemas = await Cinema.find()
    res.set(
        'Content-Security-Policy',
        "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
    )
    res.status(200).render('home', {
        cinemas,
    })
})

const getCinemaPage = catchAsync(async (req, res, next) => {
    const screenings = await Screening.find({ cinemaID: req.params.slug })
    res.set(
        'Content-Security-Policy',
        "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
    )
    res.status(200).render('screenings', {
        screenings,
    })
})

export { getHomePage, getCinemaPage }
