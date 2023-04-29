import catchAsync from '../utils/catchAsync.js'
import Cinema from '../models/cinemaModel.js'
import Screening from '../models/screeningModel.js'
import Movie from '../models/movieModel.js'
import groupByMovie from '../utils/groupByMovie.js'
import AppError from '../utils/appError.js'

const getHomePage = catchAsync(async (req, res, next) => {
    const cinemas = await Cinema.find()
    res.status(200).render('home', {
        cinemas,
    })
})

const getCinemaPage = catchAsync(async (req, res, next) => {
    // const screenings = await Screening.find({ cinemaID: req.params.slug })
    const cinema = await Cinema.findOne({ slug: req.params.slug })
    if (!cinema)
        return next(new AppError('There is no cinema with that name.', 404))
    const screenings = await Screening.find({ cinemaID: cinema._id })
    const movieIdArray = screenings.map((sc) => sc.movieID)
    const movies = await Movie.find({ _id: movieIdArray })
    const groupedScreenings = groupByMovie(screenings)
    res.status(200).render('cinema', {
        cinema,
        screenings,
        movies,
        groupedScreenings,
    })
})

const getLoginPage = (req, res, next) => {
    res.status(200).render('login')
}

const getSignupPage = (req, res, next) => {
    res.status(200).render('signup')
}

const getCheckoutLoginPage = catchAsync(async (req, res, next) => {
    res.locals.screeningID = req.params.screeningID
    if (res.locals.user) {
        return res.redirect(`/checkout/screenings/${req.params.screeningID}`)
    }
    res.status(200).render('checkoutLogin')
})

export {
    getHomePage,
    getCinemaPage,
    getLoginPage,
    getCheckoutLoginPage,
    getSignupPage,
}
