import mongoose from 'mongoose'

const screeningSchema = new mongoose.Schema({
    cinemaID: {
        type: String,
        required: [true, 'A screening must have an associated cinema'],
    },
    movieID: {
        type: String,
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
        type: String,
        required: true,
    },
    bookedSeats: [String],
})
const Screening = mongoose.model('Screening', screeningSchema)

export default Screening
