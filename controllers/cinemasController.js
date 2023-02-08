import Cinema from '../models/cinemaModel'

async function getAllCinemas(req, res) {
    try {
        const cinemas = await Cinema.find()

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

export { getAllCinemas, createCinema }
