import express from 'express'

const viewRouter = express.Router()

viewRouter.route('/').get((req, res) => {
    res.set(
        'Content-Security-Policy',
        "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
    )
    res.status(200).render('base')
})
viewRouter.route('/home').get((req, res) => {
    res.set(
        'Content-Security-Policy',
        "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
    )
    res.status(200).render('home')
})

export default viewRouter
