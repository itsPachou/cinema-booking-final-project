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
        if (result.status === 'success') {
            window.setTimeout(() => {
                location.assign('/home')
            }, 1500)
        }
    } catch (error) {
        console.log(error)
    }
}

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault()
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    login(email, password)
})
