const fs = require('fs')

const cinemas = JSON.parse(
    fs.readFileSync(`${__dirname}\\..\\dev-data\\cinema-locations.json`)
)

function getAllCinemas(req, res) {
    res
        .status(200)
        .json({
            status: "success",
            results: cinemas.locations.length,
            data: {
                cinemas
            }
        })
}

module.exports = {
    getAllCinemas
}