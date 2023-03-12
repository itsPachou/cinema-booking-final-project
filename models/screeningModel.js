import mongoose from 'mongoose'

const screeningSchema = new mongoose.Schema({
    cinemaID: {
        type: mongoose.ObjectId,
        required: [true, 'A screening must have an associated cinema'],
    },
    movieID: {
        type: mongoose.ObjectId,
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
        required: true,
    },
    bookedSeats: [String],
})
const Screening = mongoose.model('Screening', screeningSchema)

export default Screening
