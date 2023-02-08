import mongoose from 'mongoose'

const cinemaSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: [true, 'A cinema must have a name'],
        unique: true,
    },
    postcode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
})
const Cinema = mongoose.model('Cinema', cinemaSchema)

export default Cinema
