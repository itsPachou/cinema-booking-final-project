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
    })
}

export { handleTicketButton, confirmEditTickets, populateRoomLayout }
