'use strict'

import { loadJSON } from './backEndConnections.js'
import { showAlert } from './alerts.js'

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
        if (result.status === 'success') {
            showAlert('success', 'Logged in successfully!')
            if (location.pathname === '/login') {
                window.setTimeout(() => {
                    location.assign('/home')
                }, 1500)
            } else if (location.pathname.startsWith('/checkoutLogin')) {
                console.log(location.pathname.split('/').at(-1))
                window.setTimeout(() => {
                    location.assign(
                        `/checkout/screenings/${
                            location.pathname.split('/')[-1]
                        }`
                    )
                }, 1500)
            }
        }
    } catch (error) {
        showAlert('error', error.message)
    }
}

const logout = async () => {
    try {
        const result = await loadJSON(
            'http://localhost:3000/api/v1/users/logout',
            { method: 'GET' }
        )
        if (result.status === 'success') location.reload(true)
    } catch (error) {
        showAlert('error', 'Error logging out! Try again.')
    }
}

const signup = async (
    email,
    password,
    passwordConfirm,
    firstName,
    lastName,
    phoneNumber
) => {
    try {
        const result = await loadJSON(
            'http://localhost:3000/api/v1/users/signup',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    passwordConfirm,
                    firstName,
                    lastName,
                    phoneNumber: phoneNumber,
                }),
            }
        )
        if (result.status === 'success') {
            showAlert('success', 'Signed up successfully!')
            if (location.pathname === '/signup') {
                window.setTimeout(() => {
                    location.assign('/home')
                }, 1500)
            } else if (location.pathname.startsWith('/checkoutLogin')) {
                window.setTimeout(() => {
                    location.assign(
                        `/checkout/screenings/${res.locals.screeningID}`
                    )
                }, 1500)
            }
        }
    } catch (error) {
        showAlert('error', error.message)
    }
}

export { login, logout, signup }
