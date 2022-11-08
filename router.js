'use strict'

import express from 'express'
import * as cinemasController from './controllers/cinemasController.js'
import * as screeningsController from './controllers/screeningsController.js'

const router = express.Router()

router
    .route('/cinemas')
    .get(cinemasController.getAllCinemas)
router
    .route('/screenings')
    .get(screeningsController.getAllScreenings)

export default router