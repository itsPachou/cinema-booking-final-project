import mongoose from 'mongoose'

const screeningSchema = new mongoose.Schema({
    cinema: {
        type: String,
        required: [true, 'A screening must have an associated cinema'],
    },
    movie: {
        type: String,
        required: [true, 'A screening must have an associated movie'],
    },
    listings: [
        {
            date: {
                type: Date,
                required: true,
            },
            screeningType: {
                type: String,
                required: true,
            },
            originalLanguage: {
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
            },
            screeningRoom: {
                type: String,
                required: true,
            },
            bookedSeats: [String],
        },
    ],
})
const Screening = mongoose.model('Screening', screeningSchema)

export default Screening
