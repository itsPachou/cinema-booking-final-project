const express = require('express')
const cinemasController = require('./controllers/cinemasController.js')
const screeningsController = require('./controllers/screeningsController.js')

const router = express.Router()

router
    .route('/cinemas')
    .get(cinemasController.getAllCinemas)
router
    .route('/screenings')
    .get(screeningsController.getAllScreenings)

module.exports = router