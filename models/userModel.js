import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordChangedAt: Date,
    role: {
        type: String,
        enum: ['client', 'employee', 'admin'],
        required: true,
        default: 'client',
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
    },
    bookings: [
        {
            screeningID: String,
            seats: [String],
        },
    ],
})
const User = mongoose.model('User', userSchema)

export default User
