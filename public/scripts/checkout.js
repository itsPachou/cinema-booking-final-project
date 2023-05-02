'use strict'

import { showAlert } from './alerts.js'
import { getRoom } from './backEndConnections.js'

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

const handleTicketButton = (action, target) => {
    if (action === 'plus') {
        target.innerText = target.innerText * 1 + 1
    }
    if (action === 'minus') {
        target.innerText =
            target.innerText * 1 > 0 ? target.innerText * 1 - 1 : 0
    }
}

const confirmEditTickets = (tickets, btn) => {
    console.log(btn)
    if (tickets === 0) {
        showAlert('error', 'Select a valid number of tickets.')
        return
    }
    document
        .querySelectorAll('.ticket-btn')
        .forEach((btn) => (btn.disabled = !btn.disabled))
    if (btn.innerText === 'Edit') {
        btn.innerText = 'Confirm'
    } else {
        sessionStorage.setItem('numOfTickets', tickets)
        btn.innerText = 'Edit'
    }
}

const selectSeat = (target) => {
    if (
        !target.classList.contains('seat-taken') &&
        sessionStorage.getItem('numOfTickets') * 1 >
            sessionStorage.getItem('numOfSelected') * 1 &&
        !target.classList.contains('seat-selected')
    ) {
        target.classList.add('seat-selected')
        const selectedPositions =
            JSON.parse(sessionStorage.getItem('selectedPositions')) || []
        selectedPositions.push([target.dataset.row, target.dataset.col])
        sessionStorage.setItem(
            'selectedPositions',
            JSON.stringify(selectedPositions)
        )
        sessionStorage.setItem(
            'numOfSelected',
            sessionStorage.getItem('numOfSelected') * 1 + 1
        )
    } else if (
        !target.classList.contains('seat-taken') &&
        target.classList.contains('seat-selected')
    ) {
        target.classList.remove('seat-selected')
        const unselectedCoords = [target.dataset.row, target.dataset.col]
        const selectedPositions = JSON.parse(
            sessionStorage.getItem('selectedPositions')
        ).filter((el) => el.toString() !== unselectedCoords.toString())
        sessionStorage.setItem(
            'selectedPositions',
            JSON.stringify(selectedPositions)
        )
        sessionStorage.setItem(
            'numOfSelected',
            sessionStorage.getItem('numOfSelected') * 1 - 1
        )
    }
}

const populateRoomLayout = async (roomId, seatSelectionDiv) => {
    const room = await getRoom(roomId)
    console.log(room)
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
            console.log(e)
            selectSeat(e.target)
        })
    })
}

export { handleTicketButton, confirmEditTickets, populateRoomLayout }
