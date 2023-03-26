import * as backEndConnections from './backEndConnections.js'

const cinemaList = document.getElementById('cinema-list')

const resJSON = await backEndConnections.loadCinemas()
populateCinemaList(resJSON.data.cinemas)

function populateCinemaList(cinemas) {
    cinemas.forEach((cinema) => {
        let listItem = document.createElement('a')
        listItem.innerText = cinema.locationName
        listItem.href = `${window.location.origin}/screenings?cid=${cinema._id}`
        cinemaList.appendChild(listItem)
    })
}
