import mongoose from 'mongoose'

const screeningSchema = new mongoose.Schema(
    {
        cinemaID: {
            type: mongoose.ObjectId,
            ref: 'Cinema',
            required: [true, 'A screening must have an associated cinema'],
        },
        movieID: {
            type: mongoose.ObjectId,
            ref: 'Movie',
            required: [true, 'A screening must have an associated movie'],
        },
        date: {
            type: Date,
            required: true,
        },
        screeningType: {
            type: String,
            required: true,
        },
        audioType: {
            type: String,
            required: true,
            enum: ['subtitles', 'dubbing', 'original'],
        },
        audioLanguage: {
            type: String,
            default: 'none',
        },
        screeningRoomID: {
            type: mongoose.ObjectId,
            ref: 'Room',
            required: true,
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

screeningSchema.virtual('bookedSeats', {
    ref: 'Booking',
    localField: '_id',
    foreignField: 'screeningID',
})

const Screening = mongoose.model('Screening', screeningSchema)

export default Screening
