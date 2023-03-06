import mongoose from 'mongoose'

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'A Movie must have a title'],
        unique: true,
    },
    runtime: {
        type: Number,
        required: true,
    },
    synopsis: {
        type: String,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    director: {
        type: String,
    },
    classification: {
        type: String,
        enum: ['U', 'PG', '12A', '12', '15', '18'],
        required: true,
    },
    cast: [String],
    language: {
        type: String,
        required: true,
    },
})
const Movie = mongoose.model('Movie', movieSchema)

export default Movie
