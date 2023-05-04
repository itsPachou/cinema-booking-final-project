import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema(
    {
        screeningID: {
            type: mongoose.ObjectId,
            ref: 'Screening',
            required: true,
        },
        userID: {
            type: mongoose.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        paid: {
            type: Boolean,
            default: false,
        },
        tickets: [
            {
                seatRow: Number,
                seatCol: Number,
                seatName: String,
                price: Number,
            },
        ],
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

bookingSchema.virtual('totalPrice').get(function () {
    return this.tickets.reduce((accum, ticket) => accum + ticket.price, 0)
})

bookingSchema.virtual('expired').get(function () {
    if (!this.paid && Date.parse(this.createdAt) + 5 * 60 * 1000 < Date.now()) {
        return true
    }
    return false
})

bookingSchema.pre(/^find/, function (next) {
    this.populate('screeningID')
    next()
})

const Booking = mongoose.model('Booking', bookingSchema)

export default Booking
