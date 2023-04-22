'use strict'

import { login } from './login.js'

const loginForm = document.getElementById('loginForm')
const hamburgerBtn = document.getElementById('hamburger-btn')
const menu = document.getElementById('menu')

if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', function () {
        hamburgerBtn.classList.toggle('is-active')
        menu.classList.toggle('is-active')
    })
}

if (loginForm) {
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault()
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        login(email, password)
    })
}
