'use strict'

import { showAlert } from './alerts.js'

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

export { handleTicketButton, confirmEditTickets }
