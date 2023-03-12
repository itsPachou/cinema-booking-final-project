import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
    cinemaID: {
        type: mongoose.ObjectId,
        ref: 'Cinema',
        required: true,
    },
    roomNumber: {
        type: Number,
        min: 1,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
        required: true,
    },
    dimensions: {
        width: {
            type: Number,
            required: true,
            min: 1,
        },
        length: {
            type: Number,
            required: true,
            min: 1,
        },
    },
    seatPositions: [
        {
            row: Number,
            col: Number,
        },
    ],
})
const Room = mongoose.model('Room', roomSchema)

export default Room
