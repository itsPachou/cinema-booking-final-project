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

viewRouter.route('/signup').get(viewsController.getSignupPage)

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

viewRouter
    .route('/checkoutLogin/screenings/:screeningID')
    .get(viewsController.getCheckoutLoginPage)

viewRouter
    .route('/checkout/screenings/:screeningID')
    .get(authController.protect, viewsController.getCheckoutPage)

viewRouter
    .route('/summary/:bookingID')
    .get(authController.protect, viewsController.getSummaryPage)

viewRouter
    .route('/bookingSuccess/:bookingID')
    .get(authController.protect, viewsController.getBookingSuccessPage)

export default viewRouter
