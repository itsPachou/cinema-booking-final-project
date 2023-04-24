import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'node:crypto'

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
        validate: {
            validator: function (el) {
                return el === this.password
            },
            message: 'Passwords do not match!',
        },
    },
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
            screeningID: {
                type: mongoose.ObjectId,
                ref: 'Screening',
            },
            seats: [String],
        },
    ],
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
        type: Boolean,
        default: true,
        select: false,
    },
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

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    try {
        const hashedPassword = await bcrypt.hash(this.password, saltRounds)
        this.password = hashedPassword
        this.passwordConfirm = undefined
        next()
    } catch (error) {
        return next(error)
    }
})

userSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next()
    this.passwordChangedAt = Date.now() - 1000
    next()
})

userSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } })
    next()
})

userSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex')

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000

    return resetToken
}

const User = mongoose.model('User', userSchema)

export default User
