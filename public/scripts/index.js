'use strict'

import { login, logout } from './login.js'

const loginForm = document.getElementById('loginForm')
const logoutBtn = document.getElementById('logoutBtn')
const hamburgerBtn = document.getElementById('hamburger-btn')
const menu = document.getElementById('menu')

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
        hamburgerBtn.classList.toggle('is-active')
        menu.classList.toggle('is-active')
    })
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        login(email, password)
    })
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logout)
}
