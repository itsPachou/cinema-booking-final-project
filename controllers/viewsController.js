import catchAsync from '../utils/catchAsync.js'
import Cinema from '../models/cinemaModel.js'
import Screening from '../models/screeningModel.js'
import Movie from '../models/movieModel.js'
import groupByMovie from '../utils/groupByMovie.js'
import groupByDate from '../utils/groupByDate.js'
import AppError from '../utils/appError.js'
import Booking from '../models/bookingModel.js'
import Room from '../models/roomModel.js'
import User from '../models/userModel.js'

const getHomePage = catchAsync(async (req, res, next) => {
    const cinemas = await Cinema.find()
    res.status(200).render('home', {
        cinemas,
        carousel: true,
    })
})

const getCinemaPage = catchAsync(async (req, res, next) => {
    // const screenings = await Screening.find({ cinemaID: req.params.slug })
    const cinema = await Cinema.findOne({ slug: req.params.slug })
    if (!cinema)
        return next(new AppError('There is no cinema with that name.', 404))
    const currDate = new Date(Date.now()).toISOString()
    const weekAheadDate = new Date(
        Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString()
    const screenings = await Screening.find({
        cinemaID: cinema._id,
        date: {
            $gte: currDate.substring(0, currDate.indexOf('T')),
            $lt: weekAheadDate.substring(0, currDate.indexOf('T')),
        },
    })
    const movieIdArray = screenings.map((sc) => sc.movieID)
    const movies = await Movie.find({
        _id: movieIdArray,
    })
    const groupedScreenings = groupByMovie(screenings)
    Object.keys(groupedScreenings).forEach((el) => {
        groupedScreenings[el] = groupByDate(groupedScreenings[el])
    })
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
    if (!booking) {
        return next(new AppError('No booking found with that ID.', 400))
    }
    if (booking.expired || booking.paid) {
        return next(new AppError('This booking is no longer available.', 400))
    }
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

const getBookingSuccessPage = catchAsync(async (req, res, next) => {
    await Booking.findByIdAndUpdate(req.params.bookingID, { paid: true })
    res.status(200).render('bookingSuccess')
})

const getUserPage = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find({ userID: req.user._id, paid: true })
    const screeningIDArray = bookings.map((el) => el.screeningID)
    const screenings = await Screening.find({ _id: screeningIDArray }).populate(
        'movieID'
    )
    const activeBookings = []
    const pastBookings = []
    bookings.forEach((el) => {
        const sc = screenings.find(
            (screening) => screening.id === el.screeningID.id
        )
        if (
            Date.parse(sc.date) + sc.movieID.runtime * 60 * 1000 >=
            Date.now()
        ) {
            activeBookings.push(el)
        } else {
            pastBookings.push(el)
        }
    })
    res.status(200).render('userPage', {
        activeBookings,
        pastBookings,
        screenings,
    })
})

const getConsolePage = (req, res, next) => {
    res.status(200).render('console')
}

const getResourceConsolePage = catchAsync(async (req, res, next) => {
    if (
        !['cinemas', 'users', 'movies', 'screenings', 'rooms'].includes(
            req.params.resource
        )
    ) {
        return next(
            new AppError(`No such resource ${req.params.resource}`, 404)
        )
    }
    if (req.params.resource === 'users') {
        // users special case
    }
    let model
    switch (req.params.resource) {
        case 'cinemas':
            model = Cinema
            break
        case 'rooms':
            model = Room
            break
        case 'screenings':
            model = Screening
            break
        case 'movies':
            model = Movie
            break
        case 'users':
            model = User
            break

        default:
            break
    }
    const data = await model.find({})

    res.status(200).render('resourceConsole', {
        data,
        resource: req.params.resource,
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
    getBookingSuccessPage,
    getUserPage,
    getConsolePage,
    getResourceConsolePage,
}
