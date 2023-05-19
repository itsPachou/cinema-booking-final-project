const compileMovieData = () => {
    const dataObj = {}
    dataObj.title = document.getElementById('movies-title').value.trim()
    dataObj.synopsis = document.getElementById('movies-synopsis').value.trim()
        ? document.getElementById('movies-synopsis').value.trim()
        : undefined
    dataObj.runtime = document.getElementById('movies-runtime').value * 1
    dataObj.releaseDate = document
        .getElementById('movies-releaseDate')
        .value.trim()
    dataObj.director = document.getElementById('movies-director').value.trim()
        ? document.getElementById('movies-director').value.trim()
        : undefined
    dataObj.classification = document.getElementById(
        'movies-classification'
    ).value
    dataObj.cast = document
        .getElementById('movies-cast')
        .value.split(',')
        .map((el) => el.trim())
    dataObj.language = document.getElementById('movies-language').value.trim()
    dataObj.thumbnail = document.getElementById('movies-thumbnail').value.trim()
    return dataObj
}

const compileCinemaData = () => {
    const dataObj = {}
    dataObj.locationName = document
        .getElementById('cinemas-locationName')
        .value.trim()
    dataObj.postcode = document.getElementById('cinemas-postcode').value.trim()
    dataObj.address = document.getElementById('cinemas-address').value.trim()
    dataObj.location = document.getElementById('cinemas-location').value.trim()
        ? document
              .getElementById('cinemas-location')
              .value.trim()
              .value.split(',')
              .map((el) => parseFloat(el.trim()))
        : undefined
    return dataObj
}

const compileUserData = () => {
    const dataObj = {}
    dataObj.email = document.getElementById('users-email').value.trim()
    dataObj.role = document.getElementById('users-role').value
    dataObj.firstName = document.getElementById('users-firstName').value.trim()
    dataObj.lastName = document.getElementById('users-lastName').value.trim()
    dataObj.phoneNumber = document
        .getElementById('users-phoneNumber')
        .value.trim()
        ? document.getElementById('users-phoneNumber').value.trim()
        : undefined
    return dataObj
}

const compileScreeningData = () => {
    const dataObj = {}
    dataObj.cinemaID = document
        .getElementById('screenings-cinemaID')
        .value.trim()
    dataObj.movieID = document.getElementById('screenings-movieID').value.trim()
    dataObj.screeningRoomID = document
        .getElementById('screenings-screeningRoomID')
        .value.trim()
    dataObj.date = document.getElementById('screenings-date').value.trim()
    dataObj.screeningType = document
        .getElementById('screenings-screeningType')
        .value.trim()
    dataObj.audioType = document.getElementById('screenings-audioType').value
    dataObj.audioLanguage = document.getElementById('screenings-audioLanguage')
        .value
        ? document.getElementById('screenings-audioLanguage').value
        : undefined
    return dataObj
}

const compileRoomData = () => {
    const dataObj = {}
    dataObj.cinemaID = document.getElementById('rooms-cinemaID').value.trim()
    dataObj.roomNumber = document.getElementById('rooms-roomNumber').value * 1
    dataObj.isActive = document.getElementById('rooms-isActive').checked
    dataObj.dimensions = {
        length: document.getElementById('rooms-dimensions-length').value * 1,
        width: document.getElementById('rooms-dimensions-width').value * 1,
    }
    const selectedSeats = document.querySelectorAll('.seat')
    dataObj.seatPositions = []
    selectedSeats.forEach((seat) => {
        dataObj.seatPositions.push({
            row: seat.dataset.row * 1,
            col: seat.dataset.col * 1,
        })
    })
    return dataObj
}

export {
    compileCinemaData,
    compileMovieData,
    compileScreeningData,
    compileUserData,
    compileRoomData,
}
