import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const saltRounds = 8

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: true,
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

userSchema.statics.generateHash = async function (password) {
    return await bcrypt.hash(password, saltRounds)
}

userSchema.methods.validatePassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        )
        return JWTTimestamp < changedTimestamp
    }
}

const User = mongoose.model('User', userSchema)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const hashedPassword = await User.generateHash(this.password)
        this.password = hashedPassword
        next()
    } catch (error) {
        return next(error)
    }
})

export default User
