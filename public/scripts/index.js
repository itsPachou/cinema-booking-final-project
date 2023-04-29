'use strict'

import { login, logout, signup } from './login.js'

const loginForm = document.getElementById('loginForm')
const signupForm = document.getElementById('signupForm')
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

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const email = document.getElementById('emailSU').value
        const password = document.getElementById('passwordSU').value
        const passwordConfirm =
            document.getElementById('passwordConfirmSU').value
        const firstName = document.getElementById('firstNameSU').value
        const lastName = document.getElementById('lastNameSU').value
        const phoneNumber = document.getElementById('phoneNumberSU').value
        signup(
            email,
            password,
            passwordConfirm,
            firstName,
            lastName,
            phoneNumber !== '' ? phoneNumber : undefined
        )
    })
}

if (logoutBtn) {
    logoutBtn.addEventListener('click', logout)
}
