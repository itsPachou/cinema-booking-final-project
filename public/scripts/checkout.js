'use strict'

import { showAlert } from './alerts.js'
import { getRoom, getScreening, postReservation } from './backEndConnections.js'

const seatSelectionDiv = document.querySelector('.seats-selection')
const proceedBtn = document.querySelector('.confirm-seats-btn')

const rowChars = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
]
const checkoutData = {}

const handleTicketButton = (action, target) => {
    if (action === 'plus') {
        target.innerText = target.innerText * 1 + 1
    }
    if (action === 'minus') {
        target.innerText =
            target.innerText * 1 > 0 ? target.innerText * 1 - 1 : 0
    }
}

const updateSeatSelection = async () => {
    const screening = await getScreening(seatSelectionDiv.dataset.screeningId)
    const bookedSeatsArray = screening.bookedSeats
    document.querySelectorAll('.seat').forEach((el) => {
        el.classList.remove('seat-taken')
    })
    bookedSeatsArray.forEach((booking) => {
        booking.tickets.forEach((ticket) => {
            const seatEl = document.querySelector(
                `[data-row="${ticket.seatRow}"][data-col="${ticket.seatCol}"]`
            )
            seatEl.classList.add('seat-taken')
            if (seatEl.classList.contains('seat-selected')) {
                seatEl.classList.remove('seat-selected')
                checkoutData['selectedPositions'] = checkoutData[
                    'selectedPositions'
                ].filter(
                    (el) =>
                        el.toString() !==
                        [seatEl.dataset.row, seatEl.dataset.col].toString()
                )
                checkoutData['numOfSelected'] =
                    checkoutData['numOfSelected'] - 1
            }
        })
    })
}

const confirmEditTickets = (btn) => {
    const ticketsElements = Array.from(
        document.querySelectorAll('.ticket-number')
    )
    const ticketsTotal = ticketsElements.reduce(
        (accum, el) => accum + el.innerText * 1,
        0
    )
    if (ticketsTotal === 0) {
        showAlert('error', 'Select a valid number of tickets.')
        return
    }
    document
        .querySelectorAll('.ticket-btn')
        .forEach((btn) => (btn.disabled = !btn.disabled))
    if (btn.innerText === 'EDIT') {
        btn.innerText = 'Confirm'
        seatSelectionDiv.classList.toggle('seats-not-clickable')
        proceedBtn.disabled = true
    } else {
        seatSelectionDiv.classList.toggle('seats-not-clickable')
        btn.innerText = 'Edit'
        ticketsElements.forEach((el) => {
            checkoutData[el.dataset.ticketType] = el.innerText
        })
        checkoutData['numOfTickets'] = ticketsTotal
        proceedBtn.disabled = false
        if (
            checkoutData['numOfSelected'] &&
            checkoutData['numOfSelected'] > checkoutData['numOfTickets']
        ) {
            const diff =
                checkoutData['numOfSelected'] - checkoutData['numOfTickets']
            for (let i = 0; i < diff; i++) {
                const extraSeat = checkoutData['selectedPositions'].pop()
                document
                    .querySelector(
                        `[data-row="${extraSeat.at(
                            0
                        )}"][data-col="${extraSeat.at(1)}"]`
                    )
                    .classList.remove('seat-selected')
            }
            checkoutData['numOfSelected'] = checkoutData['numOfTickets']
        }
        updateSeatSelection()
    }
}

const selectSeat = (target) => {
    if (
        !target.classList.contains('seat-taken') &&
        (!checkoutData.numOfSelected ||
            checkoutData.numOfTickets > checkoutData.numOfSelected) &&
        !target.classList.contains('seat-selected')
    ) {
        target.classList.add('seat-selected')
        const selectedPositions = checkoutData.selectedPositions || []
        selectedPositions.push([target.dataset.row, target.dataset.col])
        checkoutData['selectedPositions'] = selectedPositions
        checkoutData['numOfSelected'] = checkoutData['numOfSelected'] + 1 || 1
    } else if (
        !target.classList.contains('seat-taken') &&
        target.classList.contains('seat-selected')
    ) {
        target.classList.remove('seat-selected')
        const unselectedCoords = [target.dataset.row, target.dataset.col]
        checkoutData['selectedPositions'] = checkoutData[
            'selectedPositions'
        ].filter((el) => el.toString() !== unselectedCoords.toString())
        checkoutData['numOfSelected'] = checkoutData['numOfSelected'] - 1
    }
}

const populateRoomLayout = async (roomId, seatSelectionDiv) => {
    const room = await getRoom(roomId)
    const rowNameColumn = document.createElement('div')
    rowNameColumn.classList.add('row-char-column')
    for (let r = 0; r < room.dimensions.length; r++) {
        const rowDiv = document.createElement('div')
        rowDiv.classList.add('seats-row')
        const rowName = document.createElement('div')
        rowName.innerText = rowChars.at(r)
        rowNameColumn.appendChild(rowName)
        for (let c = 0; c < room.dimensions.width; c++) {
            const seatPos = document.createElement('div')
            seatPos.classList.add('seat-position')
            seatPos.dataset.col = c
            seatPos.dataset.row = r
            rowDiv.appendChild(seatPos)
        }
        seatSelectionDiv.appendChild(rowDiv)
    }
    seatSelectionDiv.insertAdjacentElement('beforebegin', rowNameColumn)
    room.seatPositions.forEach((pos) => {
        const seatEl = document.querySelector(
            `[data-row="${pos.row}"][data-col="${pos.col}"]`
        )
        seatEl.classList.add('seat')
        seatEl.innerText = seatEl.previousElementSibling
            ? seatEl.previousElementSibling.innerText * 1 + 1
            : 1
        seatEl.addEventListener('click', (e) => {
            selectSeat(e.target)
        })
    })
    updateSeatSelection()
}

const finalizeBooking = async () => {
    try {
        if (checkoutData['numOfSelected'] !== checkoutData['numOfTickets']) {
            showAlert('error', 'Incorrect number of seats selected.')
            return
        }
        checkoutData.seatNames = []
        checkoutData['selectedPositions'].forEach((pos) => {
            const seatEl = document.querySelector(
                `[data-row="${pos.at(0)}"][data-col="${pos.at(1)}"]`
            )
            checkoutData.seatNames.push(
                `${rowChars.at(pos.at(0))}-${seatEl.innerText}`
            )
        })
        checkoutData.screeningID = seatSelectionDiv.dataset.screeningId
        const priceArray = []
        for (let i = 0; i < checkoutData.standard; i++) {
            priceArray.push(8.0)
        }
        for (let i = 0; i < checkoutData.student; i++) {
            priceArray.push(6.0)
        }
        const tickets = []
        for (const i of checkoutData.selectedPositions.keys()) {
            tickets.push({
                seatRow: checkoutData.selectedPositions.at(i).at(0) * 1,
                seatCol: checkoutData.selectedPositions.at(i).at(1) * 1,
                seatName: checkoutData.seatNames.at(i),
                price: priceArray.at(i),
            })
        }
        const reservation = await postReservation(
            checkoutData.screeningID,
            tickets
        )
        location.assign(`/summary/${reservation._id}`)
    } catch (error) {
        showAlert('error', error.message)
        if (error.message === 'Selected seats are no longer available.') {
            updateSeatSelection()
        }
    }
}

export {
    handleTicketButton,
    confirmEditTickets,
    populateRoomLayout,
    finalizeBooking,
}
