'use strict'

import fs from 'fs'

const cinemas = JSON.parse(
    fs.readFileSync(new URL('../dev-data/cinema-locations.json', import.meta.url))
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

export {
    getAllCinemas
}