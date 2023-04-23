import express from 'express'
import * as viewsController from '../controllers/viewsController.js'
import * as authController from '../controllers/authController.js'

const viewRouter = express.Router()

viewRouter.use(authController.isLoggedIn)

// permanent redirect from root to the home page
viewRouter.route('/').get((req, res) => {
    res.redirect(308, '/home')
})

viewRouter.route('/login').get(viewsController.getLoginPage)

viewRouter.route('/home').get(viewsController.getHomePage)

// viewRouter.route('/screenings').get(
//     catchAsync(async (req, res, next) => {
//         res.set(
//             'Content-Security-Policy',
//             "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
//         )
//         res.status(200).render('screenings', {})
//     })
// )

viewRouter.route('/cinema/:slug').get(viewsController.getCinemaPage)

export default viewRouter
