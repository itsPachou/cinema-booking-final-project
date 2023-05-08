import Stripe from 'stripe'
import Booking from '../models/bookingModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import Screening from '../models/screeningModel.js'
import * as factory from './handlerFactory.js'

const createCheckoutSession = catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.bookingID)

    const stripe = Stripe(process.env.STRIPE_SECRET_KEY)

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/bookingSuccess`,
        cancel_url: `${req.protocol}://${req.get('host')}/summary/${
            booking._id
        }`,
        customer_email: req.user.email,
        client_reference_id: req.params.bookingID,
        line_items: [
            {
                price_data: {
                    currency: 'gbp',
                    product_data: {
                        name: `${booking.screeningID.date.toLocaleTimeString()} x ${
                            booking.tickets.length
                        }`,
                        description: 'placeholder',
                    },
                    unit_amount: booking.totalPrice * 100,
                },
                quantity: 1,
            },
        ],
    })

    res.status(200).json({
        status: 'success',
        session,
    })
})

const setScreeningID = (req, res, next) => {
    if (!req.body.screeningID) req.body.screeningID = req.params.screeningID
    next()
}

const isSeatAvailable = (bookedSeats, seat) =>
    bookedSeats.every(
        (b) => b.seatRow !== seat.seatRow && b.seatCol !== seat.seatCol
    )

const createReservation = catchAsync(async (req, res, next) => {
    const screening = await Screening.findById(req.body.screeningID).populate(
        'bookedSeats'
    )

    const filteredBookedSeats = screening.bookedSeats.filter(
        (el) => !el.expired
    )

    const availableCheck = req.body.tickets.every((seat) =>
        isSeatAvailable(filteredBookedSeats, seat)
    )
    if (!availableCheck) {
        return next(
            new AppError('Selected seats are no longer available.', 400)
        )
    }

    const newReservation = await Booking.create({
        screeningID: req.body.screeningID,
        userID: req.user._id,
        tickets: req.body.tickets,
    })

    res.status(201).json({
        status: 'success',
        data: { newReservation },
    })
})

const getBooking = catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.id)
    if (!booking) {
        return next(new AppError('No booking found with that ID', 404))
    }
    res.status(200).json({
        status: 'success',
        data: {
            booking,
        },
    })
})

const createBooking = factory.createOne(Booking)

const updateBooking = factory.updateOne(Booking)

const deleteBooking = factory.deleteOne(Booking)

export {
    createCheckoutSession,
    setScreeningID,
    createReservation,
    createBooking,
    updateBooking,
    deleteBooking,
    getBooking,
}
