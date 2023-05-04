import catchAsync from '../utils/catchAsync.js'
import Cinema from '../models/cinemaModel.js'
import Screening from '../models/screeningModel.js'
import Movie from '../models/movieModel.js'
import groupByMovie from '../utils/groupByMovie.js'
import AppError from '../utils/appError.js'
import Booking from '../models/bookingModel.js'

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

const getCheckoutPage = catchAsync(async (req, res, next) => {
    const screening = await Screening.findById(req.params.screeningID)
    res.status(200).render('checkout', {
        screening,
    })
})

const getSummaryPage = catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.bookingID)
    const movie = await Movie.findById(booking.screeningID.movieID)
    const ticketSubtotals = []
    booking.tickets.forEach((ticket) => {
        const ticketType = ticket.price === 8.0 ? 'Standard' : 'Student'
        const subtotalEL = ticketSubtotals.find(
            (el) => el.ticketType === ticketType
        )
        if (subtotalEL) {
            subtotalEL.subtotal += ticket.price
            subtotalEL.quantity += 1
        } else {
            ticketSubtotals.push({
                ticketType,
                subtotal: ticket.price,
                quantity: 1,
            })
        }
    })
    res.status(200).render('summary', {
        booking,
        movie,
        ticketSubtotals,
    })
})

export {
    getHomePage,
    getCinemaPage,
    getLoginPage,
    getCheckoutLoginPage,
    getSignupPage,
    getCheckoutPage,
    getSummaryPage,
}
