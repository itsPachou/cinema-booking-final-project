'use strict'

import fs from 'fs'

const cinemas = JSON.parse(
    fs.readFileSync(new URL('../dev-data/cinemas.json', import.meta.url))
)

function getAllCinemas(req, res) {
    res
        .status(200)
        .json({
            status: "success",
            results: cinemas.cinemas.length,
            data: {
                cinemas
            }
        })
}

export {
    getAllCinemas
}