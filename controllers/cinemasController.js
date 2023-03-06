import Cinema from '../models/cinemaModel.js'

async function getAllCinemas(req, res) {
    try {
        const queryObj = { ...req.query }
        const excludedFields = ['sort', 'limit', 'fields']
        excludedFields.forEach((el) => delete queryObj[el])
        const query = await Cinema.find(queryObj)
        const cinemas = await query

        res.status(200).json({
            status: 'success',
            results: cinemas.length,
            data: {
                cinemas,
            },
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

async function getCinema(req, res) {
    try {
        const cinema = await Cinema.findById(req.params.id)

        res.status(200).json({
            status: 'success',
            data: {
                cinema,
            },
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

async function createCinema(req, res) {
    try {
        const newCinema = await Cinema.create(req.body)

        res.status(201).json({
            status: 'success',
            data: {
                cinema: newCinema,
            },
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error,
        })
    }
}

async function updateCinema(req, res) {
    try {
        const cinema = await Cinema.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        })

        res.status(200).json({
            status: 'success',
            data: {
                cinema,
            },
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

async function deleteCinema(req, res) {
    try {
        await Cinema.findByIdAndDelete(req.params.id)

        res.status(204).json({
            status: 'success',
            data: null,
        })
    } catch (error) {
        res.status(404).json({
            status: 'fail',
            message: error,
        })
    }
}

export { getAllCinemas, createCinema, deleteCinema, getCinema, updateCinema }
