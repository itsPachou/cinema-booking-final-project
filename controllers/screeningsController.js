'use strict'

function getAllScreenings(req, res) {
    res
        .status(200)
        .json({ message: "This is the screenings endpoint." })
}

export {
    getAllScreenings
}