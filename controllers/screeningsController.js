import Screening from '../models/screeningModel.js'

async function getAllScreenings(req, res) {
    try {
        const screenings = await Screening.find()

        res.status(200).json({
            status: 'success',
            results: screenings.length,
            data: {
                screenings,
            },
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

async function createScreening(req, res) {
    try {
        const newScreening = await Screening.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                screening: newScreening,
            },
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error,
        })
    }
}

async function updateScreening(req, res) {
    try {
        const screening = await Screening.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )

        res.status(200).json({
            status: 'success',
            data: {
                screening,
            },
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

export { getAllScreenings, createScreening, updateScreening }
