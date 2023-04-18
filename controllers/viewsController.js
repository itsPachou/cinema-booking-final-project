import catchAsync from '../utils/catchAsync.js'
import Cinema from '../models/cinemaModel.js'
import Screening from '../models/screeningModel.js'
import Movie from '../models/movieModel.js'
import groupByMovie from '../utils/groupByMovie.js'

const getHomePage = catchAsync(async (req, res, next) => {
    const cinemas = await Cinema.find()
    res.set(
        'Content-Security-Policy',
        "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
    )
    res.status(200).render('home', {
        cinemas,
    })
})

const getCinemaPage = catchAsync(async (req, res, next) => {
    // const screenings = await Screening.find({ cinemaID: req.params.slug })
    const cinema = await Cinema.findOne({ slug: req.params.slug })
    const screenings = await Screening.find({ cinemaID: cinema._id })
    const movieIdArray = screenings.map((sc) => sc.movieID)
    const movies = await Movie.find({ _id: movieIdArray })
    const groupedScreenings = groupByMovie(screenings)
    res.set(
        'Content-Security-Policy',
        "default-src 'self';font-src fonts.gstatic.com;style-src 'self' 'unsafe-inline' fonts.googleapis.com"
    )
    res.status(200).render('cinema', {
        cinema,
        screenings,
        movies,
        groupedScreenings,
    })
})

export { getHomePage, getCinemaPage }
