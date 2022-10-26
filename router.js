const express = require('express')

const router = express.Router()

const getAllCinemas = (req, res) => {
    res
        .status(200)
        .json({ message: "This is the cinemas endpoint." })
}
const getAllScreenings = (req, res) => {
    res
        .status(200)
        .json({ message: "This is the screenings endpoint." })
}

router
    .route('/cinemas')
    .get(getAllCinemas)
router
    .route('/screenings')
    .get(getAllScreenings)

module.exports = router