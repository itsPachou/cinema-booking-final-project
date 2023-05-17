import mongoose from 'mongoose'
import slugify from 'slugify'

const cinemaSchema = new mongoose.Schema({
    locationName: {
        type: String,
        required: [true, 'A cinema must have a name'],
        unique: true,
    },
    postcode: {
        type: String,
        required: true,
        uppercase: true,
    },
    address: {
        type: String,
        required: true,
    },
    location: [Number],
    slug: String,
})

cinemaSchema.pre('save', function (next) {
    this.slug = slugify(this.locationName, { lower: true })
    next()
})

const Cinema = mongoose.model('Cinema', cinemaSchema)

export default Cinema
