'use strict'

import { loadJSON } from './backEndConnections.js'

const login = async (email, password) => {
    try {
        const result = await loadJSON(
            'http://localhost:3000/api/v1/users/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            }
        )
        if (result.status === 'success' && location.pathname === '/login') {
            window.setTimeout(() => {
                location.assign('/home')
            }, 1500)
        }
    } catch (error) {
        console.log(error)
    }
}

export { login }
