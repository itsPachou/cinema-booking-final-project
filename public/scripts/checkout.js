'use strict'

import { showAlert } from './alerts.js'
import { getRoom } from './backEndConnections.js'

const seatSelectionDiv = document.querySelector('.seats-selection')

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
    } else {
        seatSelectionDiv.classList.toggle('seats-not-clickable')
        btn.innerText = 'Edit'
        ticketsElements.forEach((el) => {
            checkoutData[el.dataset.ticketType] = el.innerText
        })
        checkoutData['numOfTickets'] = ticketsTotal
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
}

export { handleTicketButton, confirmEditTickets, populateRoomLayout }
