'use strict'

import { createCheckout } from './backEndConnections.js'
import { showAlert } from './alerts.js'

const goToCheckout = async (target) => {
    try {
        target.innerText = 'Processing...'
        const session = await createCheckout(target.dataset.bookingId)
        location.assign(session.url)
    } catch (error) {
        showAlert('error', error)
        target.innerText = 'Proceed to payment'
    }
}

export { goToCheckout }
