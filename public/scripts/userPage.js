'use strict'

import { showAlert } from './alerts.js'
import { deleteMe, loadJSON } from './backEndConnections.js'

const deleteAccount = async () => {
    try {
        if (window.confirm('Are you sure you want to delete your account?')) {
            await deleteMe()
            showAlert('success', 'Successfully deleted account.')
            const result = await loadJSON(
                'http://localhost:3000/api/v1/users/logout',
                { method: 'GET' }
            )
            window.setTimeout(() => {
                location.assign(`/home`)
            }, 1500)
        }
    } catch (error) {
        showAlert('error', error.message)
    }
}

export { deleteAccount }
