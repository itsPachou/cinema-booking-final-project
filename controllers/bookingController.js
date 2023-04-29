import Booking from '../models/bookingModel.js'
import catchAsync from '../utils/catchAsync.js'
import AppError from '../utils/appError.js'
import * as factory from './handlerFactory.js'

const getCheckoutSession = catchAsync(async (req, res, next) => {
    const booking = await Booking.findById(req.params.bookingID)
})
