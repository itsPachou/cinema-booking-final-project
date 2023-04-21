import express from 'express'
import catchAsync from '../utils/catchAsync.js'
import * as viewsController from '../controllers/viewsController.js'

const viewRouter = express.Router()

// permanent redirect from root to the home page
viewRouter.route('/').get((req, res) => {
    res.redirect(308, '/home')
})

viewRouter.route('/home').get(viewsController.getHomePage)

viewRouter.route('/screenings').get(
    catchAsync(async (req, res, next) => {
        res.set(
            'Content-Security-Policy',
            "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
        )
        res.status(200).render('screenings', {})
    })
)
viewRouter.route('/cinema/:slug').get(viewsController.getCinemaPage)

export default viewRouter
